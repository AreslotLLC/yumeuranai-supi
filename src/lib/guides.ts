import { Guide } from "@/types";

/**
 * 全てのガイド記事データを取得（メタデータのみ）
 */
export async function getGuides(): Promise<Guide[]> {
    return guides;
}

/**
 * スラッグでガイド記事を1件取得（メタデータのみ）
 */
export async function getGuideBySlug(slug: string): Promise<Guide | null> {
    return guides.find((g) => g.slug === slug) || null;
}

/**
 * ガイド記事のメタデータ一覧
 * 本文コンテンツは各 /app/guide/[slug]/page.tsx に移動しました。
 */
const guides: Guide[] = [
    {
        id: "guide-basics-01",
        slug: "meaning-of-dreams",
        title: "「夢占い」の扉を開く：夜空が届ける心の手紙",
        fullTitle: "夜空が届ける、心からのお手紙：夢占いの扉を開くための最初の一歩",
        description: "夢占いの歴史から心理学的・スピリチュアル的アプローチ、正しい解釈のコツまで徹底解説。夢が教える深層心理のSOSや未来の予兆を捉えるための完全ガイドです。",
        category: "夢の扉を開く鍵",
        publishedDate: "2026-01-22",
        image: "/images/guide/basics.png"
    },
    {
        id: "guide-basics-02",
        slug: "how-to-remember-dreams",
        title: "「夢を覚える」魔法：記憶の星屑を紡いで",
        fullTitle: "消えゆく記憶の星屑を紡いで。夢の物語を明日のあなたへ繋ぐ方法",
        description: "起きた瞬間に忘れてしまう夢を記憶に留めるための「夢日記」の正しい方法や、枕元での準備、心理的な注意点について詳しく解説します。",
        category: "夢の扉を開く鍵",
        publishedDate: "2026-01-22",
        image: "/images/guide/remember.png"
    },
    {
        id: "guide-symbols-01",
        slug: "lucky-dreams",
        title: "「吉夢」のささやき：幸福のしずく、光への導き",
        fullTitle: "運命がささやく幸福のしずく。光り輝く未来を呼び込む「吉夢」の調べ",
        description: "白蛇、火事、自分が死ぬ夢……。一見怖そうでも実は最強の大吉夢？金運や成功、人間関係の劇的好転を暗示する幸運のサインを詳しく解説します。",
        category: "万象が語る物語",
        publishedDate: "2026-01-22",
        image: "/images/guide/lucky.png"
    },
    {
        id: "guide-psychology-01",
        slug: "nightmare-psychology",
        title: "「悪夢」を癒やす：闇夜の奥に眠る光 | 夢と占い.jp",
        fullTitle: "闇夜の奥に眠る、癒やしの光。悪夢が教える魂のSOSと、静かな眠りを守る魔法",
        description: "追いかけられる、落ちる、歯が抜ける……。悪夢が教えるストレスの正体と、心のSOSを読み解くヒント。イメージ変換法などの改善策も解説。",
        category: "心の奥底への旅路",
        publishedDate: "2026-01-30",
        image: "/images/guide/nightmare.png"
    },
    {
        id: "guide-nightmare-01",
        slug: "precognitive-dreams",
        title: "「予知夢」の余韻：未来からの静かなメッセージ | 夢と占い.jp",
        fullTitle: "時を超えて届く、未来からの静かな余韻。予知夢と正夢が告げる運命の予兆",
        description: "時を超えて届く、未来からの静かな余韻。デジャヴや予知夢はなぜ起きるのか？特別な意味を持つ夢の特徴と、科学的背景・心理学的な視点を交えて詳しく解説します。",
        category: "月影と予兆の調べ",
        publishedDate: "2026-01-30",
        image: "/images/guide/precognitive.png"
    },
    {
        id: "guide-repeated-01",
        slug: "repeated-dreams",
        title: "「同じ夢」の調べ：魂が繰り返す旋律 | 夢と占い.jp",
        fullTitle: "魂が何度も繰り返す、切実な愛の旋律。同じ夢があなたに伝えたい、真実の想い",
        description: "魂が何度も繰り返す、切実な愛の旋律。なぜ同じ夢を繰り返し見るのでしょうか？潜在意識が伝えようとしている「警告」とメッセージ、運気を好転させるための対処法を解説します。",
        category: "心の奥底への旅路",
        publishedDate: "2026-01-29",
        image: "/images/guide/repeated.png"
    },
    {
        id: "guide-color-01",
        slug: "color-psychology",
        title: "「夢の色」が語る心理：夢を彩る七色の魔法",
        fullTitle: "夢の景色を鮮やかに彩る、七色の魔法。色が奏でる、あなたの心の物語",
        description: "夢の中の印象的な「色」は何を象徴しているのでしょうか？赤、青、金、白など、色ごとに異なる心理状態や運気のメッセージを詳しく解説します。",
        category: "万象が語る物語",
        publishedDate: "2026-01-29",
        image: "/images/guide/color-psychology.png"
    },
    {
        id: "guide-lucid-01",
        slug: "lucid-dreaming",
        title: "「明晰夢」の旅：夢の国を自由に泳いで | 夢と占い.jp",
        fullTitle: "夢の国を、思うままに自由に泳いで。意識を研ぎ澄まし、夢の主役になる秘策",
        description: "夢の国を、思うままに自由に泳いで。意識を研ぎ澄まし、夢の主役になるための具体的なテクニックやトレーニング方法を徹底解説します。",
        category: "夢の扉を開く鍵",
        publishedDate: "2026-01-30",
        image: "/images/guide/lucid.png"
    },
];
