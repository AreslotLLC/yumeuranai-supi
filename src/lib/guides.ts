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
        title: "夢占いの基礎知識",
        fullTitle: "夢占いとは？深層心理のメッセージを読み解く基礎知識と活用法",
        description: "夢占いの歴史から心理学的・スピリチュアル的アプローチ、正しい解釈のコツまで徹底解説。夢が教える深層心理のSOSや未来の予兆を捉えるための完全ガイドです。",
        category: "夢占いの基礎知識",
        publishedDate: "2026-01-22",
        image: "/images/guide/basics.png"
    },
    {
        id: "guide-basics-02",
        slug: "how-to-remember-dreams",
        title: "夢を覚える方法",
        fullTitle: "夢を覚える方法：夢日記の書き方と記憶を定着させる実践テクニック",
        description: "起きた瞬間に忘れてしまう夢を記憶に留めるための「夢日記」の正しい方法や、枕元での準備、心理的な注意点について詳しく解説します。",
        category: "夢占いの基礎知識",
        publishedDate: "2026-01-22",
        image: "/images/guide/remember.png"
    },
    {
        id: "guide-symbols-01",
        slug: "lucky-dreams",
        title: "金運・幸運の夢",
        fullTitle: "金運・幸運を呼ぶ夢の象徴：宝くじ当選や成功の前兆とされる「吉夢」ガイド",
        description: "白蛇、火事、自分が死ぬ夢……。一見怖そうでも実は最強の大吉夢？金運や成功、人間関係の劇的好転を暗示する幸運のサインを詳しく解説します。",
        category: "象徴と意味",
        publishedDate: "2026-01-22",
        image: "/images/guide/lucky.png"
    },
    {
        id: "guide-psychology-01",
        slug: "nightmare-psychology",
        title: "悪夢の心理学",
        fullTitle: "怖い夢（悪夢）を見る理由と心理：繰り返し見る夢を止めるための対処法",
        description: "追いかけられる、落ちる、歯が抜ける……。悪夢が教えるストレスの正体と、心のSOSを読み解くヒント。イメージ変換法などの改善策も解説。",
        category: "深層心理と感情",
        publishedDate: "2026-01-22",
        image: "/images/guide/nightmare.png"
    },
    {
        id: "guide-nightmare-01",
        slug: "precognitive-dreams",
        title: "予知夢と正夢",
        fullTitle: "予知夢と正夢の正体：現実を予見する夢を見分ける3つのポイントと科学的背景",
        description: "「昨日見た夢と同じことが現実に起きた！」デジャヴや予知夢はなぜ起きるのか？特別な意味を持つ夢の特徴と、脳解析学的な視点を交えて詳しく解説します。",
        category: "悪夢と予知夢",
        publishedDate: "2026-01-22",
        image: "/images/guide/precognitive.png"
    },
    {
        id: "guide-repeated-01",
        slug: "repeated-dreams",
        title: "同じ夢を見る理由",
        fullTitle: "何度も同じ夢を見る理由：潜在意識からの重要な警告とメッセージ",
        description: "「またあの夢だ……」と不思議に思ったことはありませんか？心理学的な背景から、潜在意識が伝えようとしている「警告」メッセージ、そして運気を好転させるための対処法を解説します。",
        category: "深層心理と感情",
        publishedDate: "2026-01-29",
        image: "/images/guide/repeated.png"
    },
    {
        id: "guide-color-01",
        slug: "color-psychology",
        title: "カラー別夢占い",
        fullTitle: "カラー別夢占い：夢の中の「色」が伝えるあなたの深層心理",
        description: "夢の中の印象的な「色」は何を象徴しているのでしょうか？赤、青、金、白など、色ごとに異なる心理状態や運気のメッセージを詳しく解説します。",
        category: "象徴と意味",
        publishedDate: "2026-01-29",
        image: "/images/guide/color-psychology.png"
    },
    {
        id: "guide-lucid-01",
        slug: "lucid-dreaming",
        title: "明晰夢のコツ",
        fullTitle: "明晰夢（夢を操る）のコツ：意識的に夢を見るためのトレーニング方法",
        description: "夢の中で「これは夢だ！」と気づく体験、明晰夢。そのメリットから、現実確認（リアリティ・チェック）、暗示を用いた具体的な習得テクニック、そして注意点までを徹底解説します。",
        category: "夢占いの基礎知識",
        publishedDate: "2026-01-29",
        image: "/images/guide/lucid.png"
    },
];
