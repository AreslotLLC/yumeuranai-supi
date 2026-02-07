import { DreamContent, Guide, AffiliateAd } from "../types";
import { mockDreamContents, mockGuides } from "../mocks/airtableData";

// Airtableが設定されているかチェック
const isAirtableConfigured =
    process.env.AIRTABLE_API_KEY &&
    process.env.AIRTABLE_API_KEY !== "your_api_key_here" &&
    process.env.AIRTABLE_BASE_ID &&
    process.env.AIRTABLE_BASE_ID !== "your_base_id_here";

/**
 * Airtable API設定
 */
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

// カテゴリ情報のキャッシュ
let categoriesCache: any[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 3600 * 1000; // 1時間

/**
 * Airtable Web APIを直接呼び出すヘルパー関数
 */
interface AirtableRecord {
    id: string;
    fields: Record<string, unknown>;
}

interface AirtableResponse {
    records: AirtableRecord[];
    offset?: string;
}

async function fetchAirtable(
    tableName: string,
    options?: { filterByFormula?: string; maxRecords?: number }
): Promise<AirtableRecord[]> {
    if (!isAirtableConfigured) {
        return [];
    }

    const baseId = process.env.AIRTABLE_BASE_ID!;
    const apiKey = process.env.AIRTABLE_API_KEY!;

    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`);

    if (options?.filterByFormula) {
        url.searchParams.set("filterByFormula", options.filterByFormula);
    }
    if (options?.maxRecords) {
        url.searchParams.set("maxRecords", String(options.maxRecords));
    }

    const allRecords: AirtableRecord[] = [];
    let offset: string | undefined;

    do {
        if (offset) {
            url.searchParams.set("offset", offset);
        }

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 }, // Next.js: 1時間キャッシュ
        } as any);

        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
        }

        const data: AirtableResponse = await response.json();
        allRecords.push(...data.records);
        offset = data.offset;

        if (options?.maxRecords) break;
    } while (offset);

    return allRecords;
}

// テーブル名
const KEYWORDS_TABLE = process.env.AIRTABLE_TABLE_KEYWORDS || "Keywords";
const CATEGORIES_TABLE = process.env.AIRTABLE_TABLE_CATEGORIES || "Categories";
const GLOBAL_SETTINGS_TABLE = process.env.AIRTABLE_TABLE_GLOBAL_SETTINGS || "GlobalSettings";
const GUIDES_TABLE = process.env.AIRTABLE_TABLE_GUIDES || "Guides";
const AFFILIATE_TABLE = process.env.AIRTABLE_TABLE_AFFILIATE || "Affiliate";

// 定数
const STATUS_PUBLISHED = "Published";

// フィールド名
const FIELDS = {
    // Common
    STATUS: "status", // Keywordsテーブルに合わせて小文字
    SLUG: "slug",
    DESCRIPTION: "description",
    ARTICLE: "article",
    META_TITLE: "metaTitle",
    META_DESCRIPTION: "metaDescription",

    // Keywords (Formerly Contents)
    KEYWORD: "keyword", // ここはOK
    TAGS: "tag",       // ここはOK
    INITIAL: "ひらがな", // OK
    SYMBOLISM: "象徴",   // 要確認（データになかったが既存通りとする）
    CATEGORY: "カテゴリ", // OK
    KANA_INDEX: "kana_index", // 五十音索引用
    SITUATIONS_JSON: "situationsJson", // 要確認（既存通りとする）
    RELATED_KEYWORDS: "relatedKeywords", // 要確認（既存通りとする）

    // Categories
    CATEGORY_NAME: "Name", // OK

    // GlobalSettings
    SETTING_KEY: "Key",
    SETTING_VALUE: "Value",

    // Guides
    GUIDE_TITLE: "title",
    GUIDE_FULL_TITLE: "fullTitle",
    GUIDE_IMAGE: "image",
    GUIDE_CATEGORY: "category",
    GUIDE_PUBLISHED_DATE: "publishedDate",

    // Affiliate
    AFFILIATE_NAME: "Name", // OK
    BANNER_HTML: "BannerHtml", // OK
    BANNER_TYPE: "BannerType", // OK
    TARGET_TAG: "TargetTag", // OK

    IS_DEFAULT: "IsDefault", // OK
};

/**
 * 全夢占いコンテンツを取得
 */
export async function getDreamContents(): Promise<DreamContent[]> {
    if (!isAirtableConfigured) return getMockDreamContents();

    try {
        const records = await fetchAirtable(KEYWORDS_TABLE, {
            filterByFormula: `{${FIELDS.STATUS}} = "${STATUS_PUBLISHED}"`
        });
        const contents = records.map(mapRecordToDreamContent);

        // カテゴリ名の一括解決
        await resolveCategoriesForContents(contents);

        return contents;
    } catch (error) {
        console.error("Failed to fetch dream contents:", error);
        return getMockDreamContents();
    }
}

/**
 * カテゴリ一覧を取得（キャッシュ付き）
 */
export async function getCategories(): Promise<any[]> {
    const now = Date.now();
    if (categoriesCache && (now - lastCacheTime < CACHE_TTL)) {
        return categoriesCache;
    }

    if (!isAirtableConfigured) {
        const mock = [{ id: "c1", name: "動物", slug: "動物" }];
        categoriesCache = mock;
        lastCacheTime = now;
        return mock;
    }

    try {
        const records = await fetchAirtable(CATEGORIES_TABLE);
        const categories = records.map(r => ({
            id: r.id,
            name: String(r.fields[FIELDS.CATEGORY_NAME] || ""),
            slug: String(r.fields[FIELDS.CATEGORY_NAME] || "") // 名称自体をスラッグとして使用
        }));

        categoriesCache = categories;
        lastCacheTime = now;
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return categoriesCache || [];
    }
}

/**
 * 複数のコンテンツのカテゴリIDを名称に一括変換する
 */
async function resolveCategoriesForContents(contents: DreamContent[]) {
    const categories = await getCategories();
    const categoryMap = new Map(categories.map(c => [c.id, c.name]));

    for (const content of contents) {
        if (content.category) {
            if (Array.isArray(content.category)) {
                content.category = content.category.map(id => categoryMap.get(id) || id);
            } else {
                content.category = categoryMap.get(content.category) || content.category;
            }
        }
    }
}

/**
 * カテゴリIDから名称を取得
 */
export async function resolveCategoryName(categoryId: string): Promise<string> {
    if (!categoryId || categoryId === "uncategorized") return "未分類";

    // もし % が含まれていたらデコードを試みる（二重エンコード対策）
    let decodedId = categoryId;
    if (categoryId.includes('%')) {
        try {
            decodedId = decodeURIComponent(categoryId);
        } catch (e) {
            // デコード失敗時はそのまま
        }
    }

    const categories = await getCategories();
    // IDでもスラッグでも、デコード前後どちらでも検索できるように
    const category = categories.find(c =>
        c.id === decodedId ||
        c.slug === decodedId ||
        c.id === categoryId ||
        c.slug === categoryId
    );

    return category ? category.name : decodedId;
}

/**
 * スラッグで夢占いコンテンツを取得
 */
export async function getDreamContentBySlug(slug: string): Promise<DreamContent | null> {
    if (!isAirtableConfigured) return getMockDreamContents().find((c) => c.slug === slug) || null;

    try {
        const records = await fetchAirtable(KEYWORDS_TABLE, {
            filterByFormula: `AND({${FIELDS.SLUG}} = "${slug}", {${FIELDS.STATUS}} = "${STATUS_PUBLISHED}")`,
            maxRecords: 1,
        });

        if (records.length === 0) return null;
        const content = mapRecordToDreamContent(records[0]);

        // カテゴリIDを名称に変換
        await resolveCategoriesForContents([content]);

        return content;
    } catch (error) {
        console.error("Failed to fetch dream content:", error);
        return getMockDreamContents().find((c) => c.slug === slug) || null;
    }
}

/**
 * カテゴリで夢占いコンテンツを取得
 */
export async function getDreamContentsByCategory(category: string): Promise<DreamContent[]> {
    if (!isAirtableConfigured) {
        return getMockDreamContents().filter((c) => {
            const categories = Array.isArray(c.category) ? c.category : [c.category];
            return categories.includes(category);
        });
    }

    try {
        // カテゴリ名またはIDを元に、実際のRecord IDを特定する
        const allCategories = await getCategories();
        const foundCategory = allCategories.find(c => c.name === category || c.id === category || c.slug === category);

        // CategoriesテーブルのプライマリフィールドはNameなので、nameを使用
        const searchTerm = foundCategory ? foundCategory.name : category;

        // Linked Recordフィールドの検索: FINDを使用して、該当するカテゴリ名が含まれているかチェック
        // Airtableのリンクレコードフィールドに対するFINDは、リンク先レコードのプライマリフィールド（名前）を検索対象とするため、
        // IDではなく名称（searchTerm）を使用します。
        const formula = `AND(FIND("${searchTerm}", {${FIELDS.CATEGORY}}) > 0, {${FIELDS.STATUS}} = "${STATUS_PUBLISHED}")`;

        const records = await fetchAirtable(KEYWORDS_TABLE, {
            filterByFormula: formula
        });

        const contents = records.map(mapRecordToDreamContent);

        // カテゴリIDを名称に変換
        await resolveCategoriesForContents(contents);

        return contents;
    } catch (error) {
        console.error(`Failed to fetch contents for category ${category}:`, error);
        return [];
    }
}

/**
 * 夢を検索（キーワード、タグ、ひらがなで検索）
 */
export async function searchDreamContents(query: string): Promise<DreamContent[]> {
    if (!isAirtableConfigured) {
        return getMockDreamContents().filter(
            (c) => c.title.includes(query) || (c.reading && c.reading.includes(query)) || c.tags.includes(query)
        );
    }

    try {
        const records = await fetchAirtable(KEYWORDS_TABLE, {
            filterByFormula: `AND(OR(SEARCH("${query}", {${FIELDS.KEYWORD}}), SEARCH("${query}", {${FIELDS.TAGS}}), SEARCH("${query}", {${FIELDS.INITIAL}})), {${FIELDS.STATUS}} = "${STATUS_PUBLISHED}")`
        });
        const contents = records.map(mapRecordToDreamContent);

        // カテゴリIDを名称に変換
        await resolveCategoriesForContents(contents);

        return contents;
    } catch (error) {
        console.error("Failed to search dream contents:", error);
        return [];
    }
}

/**
 * 人気の（または最新の）キーワードを取得 (TOPページ用)
 */
export async function getPopularKeywords(limit: number = 8): Promise<DreamContent[]> {
    if (!isAirtableConfigured) return getMockDreamContents().slice(0, limit);

    try {
        const records = await fetchAirtable(KEYWORDS_TABLE, {
            filterByFormula: `{${FIELDS.STATUS}} = "${STATUS_PUBLISHED}"`,
            maxRecords: limit
        });
        const contents = records.map(mapRecordToDreamContent);

        // カテゴリ解決
        await resolveCategoriesForContents(contents);

        return contents;
    } catch (error) {
        console.error("Failed to fetch popular keywords:", error);
        return getMockDreamContents().slice(0, limit);
    }
}

/**
 * 全ガイドを取得
 */
export async function getGuides(): Promise<Guide[]> {
    if (!isAirtableConfigured) return getMockGuides();

    try {
        const records = await fetchAirtable(GUIDES_TABLE, {
            filterByFormula: `{${FIELDS.STATUS}} = "Published"`
        });
        return records.map(mapRecordToGuide);
    } catch (error) {
        console.error("Failed to fetch guides:", error);
        return getMockGuides();
    }
}

/**
 * 複数の条件に一致するアフィリエイト広告をユニークに取得
 */
export async function getAffiliateAds(options: {
    requirements: Array<{ type: 'Square' | 'Horizontal' | 'Vertical', id?: string }>,
    tags?: string[]
}): Promise<(AffiliateAd | null)[]> {
    if (!isAirtableConfigured) return options.requirements.map(() => null);

    try {
        const typeMapping: Record<string, string> = {
            'Square': '正方形',
            'Horizontal': '横長',
            'Vertical': '縦長'
        };

        // 全ての公開済み広告を取得
        const records = await fetchAirtable(AFFILIATE_TABLE, {
            filterByFormula: `{Status} = "${STATUS_PUBLISHED}"`
        });

        const allAds: AffiliateAd[] = records.map(mapRecordToAffiliateAd);
        const results: (AffiliateAd | null)[] = [];
        const usedIds = new Set<string>();

        // 各リクエストに対して広告を割り当て
        for (const req of options.requirements) {
            const searchType = typeMapping[req.type] || req.type;

            // このスロットのタイプに一致し、まだ使用されていない広告を抽出
            const typeMatchedAds = allAds.filter(ad =>
                (ad.bannerType === req.type || ad.bannerType === (searchType as any)) &&
                !usedIds.has(ad.id)
            );

            if (typeMatchedAds.length === 0) {
                results.push(null);
                continue;
            }

            let selectedAd: AffiliateAd | null = null;

            // 1. タグが一致する広告を探す
            if (options.tags && options.tags.length > 0) {
                const tagMatchedAds = typeMatchedAds.filter(ad =>
                    ad.targetTag && options.tags?.includes(ad.targetTag)
                );
                if (tagMatchedAds.length > 0) {
                    selectedAd = getRandomAd(tagMatchedAds);
                }
            }

            // 2. 一致がなければデフォルト広告（IsDefault=true）を探す
            if (!selectedAd) {
                const defaultAds = typeMatchedAds.filter(ad => ad.isDefault);
                if (defaultAds.length > 0) {
                    selectedAd = getRandomAd(defaultAds);
                }
            }

            // 3. それもなければ全タイプ一致広告からランダム（Fallback）
            if (!selectedAd && typeMatchedAds.length > 0) {
                selectedAd = getRandomAd(typeMatchedAds);
            }

            if (selectedAd) {
                results.push(selectedAd);
                usedIds.add(selectedAd.id);
            } else {
                results.push(null);
            }
        }

        return results;

    } catch (error) {
        console.error("Failed to fetch affiliate ads:", error);
        return options.requirements.map(() => null);
    }
}

/**
 * 条件に一致するアフィリエイト広告を1つ取得 (後方互換性のため)
 */
export async function getAffiliateAd(options: {
    type: 'Square' | 'Horizontal' | 'Vertical',
    tags?: string[]
}): Promise<AffiliateAd | null> {
    const results = await getAffiliateAds({
        requirements: [{ type: options.type }],
        tags: options.tags
    });
    return results[0];
}

/**
 * 広告リストからランダムに1つ選出
 */
function getRandomAd(ads: AffiliateAd[]): AffiliateAd {
    if (ads.length === 0) throw new Error("No ads to select from");
    if (ads.length === 1) return ads[0];
    const randomIndex = Math.floor(Math.random() * ads.length);
    return ads[randomIndex];
}

/**
 * スラッグでガイドを取得
 */
export async function getGuideBySlug(slug: string): Promise<Guide | null> {
    const allGuides = await getGuides();
    return allGuides.find((g) => g.slug === slug) || null;
}

// Helper Mappers

function mapRecordToDreamContent(record: AirtableRecord): DreamContent {
    const fields = record.fields;
    const extractString = (val: unknown): string => {
        if (val === null || val === undefined) return "";
        if (Array.isArray(val)) return String(val[0] || "");
        return String(val);
    };

    const extractOptionalString = (val: unknown): string | undefined => {
        if (val === null || val === undefined) return undefined;
        if (Array.isArray(val)) return val[0] ? String(val[0]) : undefined;
        return String(val);
    };

    const parseSituations = (val: unknown) => {
        if (!val) return undefined;
        try {
            return JSON.parse(String(val));
        } catch {
            return undefined;
        }
    };

    const reading = extractString(fields[FIELDS.INITIAL]);
    const keyword = extractString(fields[FIELDS.KEYWORD]);

    return {
        id: record.id,
        slug: extractString(fields[FIELDS.SLUG]),
        title: extractString(fields[FIELDS.KEYWORD] || fields["title"]), // キーワードまたはタイトル
        keywords: extractString(fields[FIELDS.KEYWORD]),
        tags: (fields[FIELDS.TAGS] as string[]) || [],
        category: (fields[FIELDS.CATEGORY] as string[]) || [],
        reading: reading,
        initial: reading.charAt(0),
        kanaIndex: extractOptionalString(fields[FIELDS.KANA_INDEX]),
        description: extractOptionalString(fields[FIELDS.DESCRIPTION]),
        symbolism: extractOptionalString(fields[FIELDS.SYMBOLISM]),
        article: extractOptionalString(fields[FIELDS.ARTICLE]),
        metaTitle: extractOptionalString(fields[FIELDS.META_TITLE]),
        metaDescription: extractOptionalString(fields[FIELDS.META_DESCRIPTION]),
        situations: parseSituations(fields[FIELDS.SITUATIONS_JSON]),
        relatedKeywords: fields[FIELDS.RELATED_KEYWORDS] as string[] | undefined,
        status: extractOptionalString(fields[FIELDS.STATUS]),
    };
}

function mapRecordToGuide(record: AirtableRecord): Guide {
    const fields = record.fields;
    const extractString = (val: unknown): string => {
        if (val === null || val === undefined) return "";
        if (Array.isArray(val)) return String(val[0] || "");
        return String(val);
    };

    const extractOptionalString = (val: unknown): string | undefined => {
        if (val === null || val === undefined) return undefined;
        if (Array.isArray(val)) return val[0] ? String(val[0]) : undefined;
        return String(val);
    };

    return {
        id: record.id,
        slug: extractString(fields[FIELDS.SLUG]),
        title: extractString(fields[FIELDS.GUIDE_TITLE]),
        fullTitle: extractOptionalString(fields[FIELDS.GUIDE_FULL_TITLE]),
        description: extractOptionalString(fields[FIELDS.DESCRIPTION]),
        content: extractOptionalString(fields[FIELDS.ARTICLE]),
        image: extractOptionalString(fields[FIELDS.GUIDE_IMAGE]),
        category: extractOptionalString(fields[FIELDS.GUIDE_CATEGORY]),
        metaTitle: extractOptionalString(fields[FIELDS.META_TITLE]),
        metaDescription: extractOptionalString(fields[FIELDS.META_DESCRIPTION]),
        publishedDate: extractOptionalString(fields[FIELDS.GUIDE_PUBLISHED_DATE]),
    };
}

function mapRecordToAffiliateAd(record: AirtableRecord): AffiliateAd {
    const fields = record.fields;
    const extractString = (val: unknown): string => String(val || "");
    const extractBoolean = (val: unknown): boolean => val === true;
    const extractNumber = (val: unknown): number => typeof val === 'number' ? val : 1;

    const extractStringFromArray = (val: unknown): string => {
        if (Array.isArray(val)) return String(val[0] || "");
        return String(val || "");
    };

    const normalizeBannerType = (val: string): 'Square' | 'Horizontal' | 'Vertical' => {
        const map: Record<string, 'Square' | 'Horizontal' | 'Vertical'> = {
            '正方形': 'Square',
            '横長': 'Horizontal',
            '縦長': 'Vertical',
            'Square': 'Square',
            'Horizontal': 'Horizontal',
            'Vertical': 'Vertical'
        };
        return map[val] || (val as 'Square' | 'Horizontal' | 'Vertical');
    };

    const rawBannerType = extractStringFromArray(fields[FIELDS.BANNER_TYPE]);

    return {
        id: record.id,
        name: extractString(fields[FIELDS.AFFILIATE_NAME]),
        bannerHtml: extractString(fields[FIELDS.BANNER_HTML]),
        bannerType: normalizeBannerType(rawBannerType),
        targetTag: extractStringFromArray(fields[FIELDS.TARGET_TAG]) || undefined,
        status: extractString(fields[FIELDS.STATUS]),
        isDefault: extractBoolean(fields[FIELDS.IS_DEFAULT]),
    };
}


function getMockDreamContents(): DreamContent[] {
    return mockDreamContents;
}

function getMockGuides(): Guide[] {
    return mockGuides;
}
