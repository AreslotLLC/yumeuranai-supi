import { DreamContent, Guide } from "../types";

export const mockDreamContents: DreamContent[] = [
    {
        id: "dream1",
        slug: "snake",
        title: "蛇の夢を見た時の意味と心理",
        keywords: "蛇,金運,再生",
        tags: ["動物", "金運"],
        reading: "へび",
        initial: "へ",
        symbolism: "金運上昇、再生、知恵、あるいは執着の象徴。",
        description: "蛇の夢は、その色や状況によって意味が劇的に変わります。特に白蛇は幸運の兆しです。",
        article: "蛇（へび）は古来から神の使いや強い生命力の象徴とされてきました。夢の中で蛇を見ることは、あなたの深層心理が非常に活発になっていることを示しています。",
        situations: [
            { title: "白い蛇を見る", description: "最高レベルの金運アップを暗示する大吉夢です。予期せぬ幸運が舞い込むでしょう。" },
            { title: "蛇に噛まれる", description: "健康運の低下や対人トラブルの警告。ただし、噛まれて嫌な感じがしなければ金運アップ。" }
        ]
    },
    {
        id: "dream2",
        slug: "falling",
        title: "高いところから落ちる夢の意味",
        keywords: "落ちる,不安,ストレス",
        tags: ["動作", "感情"],
        reading: "おちる",
        initial: "お",
        symbolism: "不安、自信喪失、あるいは解放感の象徴。",
        description: "高いところから落ちる夢は、現実世界でのプレッシャーや体調の変化を反映していることが多いです。",
        article: "「落ちる」夢は、多くの人が経験する代表的な悪夢の一つ。しかし、着地した時の感覚や、どこから落ちたかによってポジティブな意味に転じることもあります。",
        situations: [
            { title: "真っ暗な穴に落ちる", description: "先の見えない状況への強い不安。一度リフレッシュして自分を見つめ直しましょう。" },
            { title: "落ちる途中で目が覚める", description: "問題が解決に向かっている、あるいはまだ解決すべきタイミングではないことを示唆。" }
        ]
    },
    {
        id: "dream3",
        slug: "flying",
        title: "空を自由に飛ぶ夢の心理",
        keywords: "空を飛ぶ,自由,野心",
        tags: ["動作", "能力"],
        reading: "そらをとぶ",
        initial: "そ",
        symbolism: "自由への渇望、野心、現実逃避。",
        description: "気持ちよく空を飛んでいる夢は、運気が上昇し物事がスムーズに進むことを意味します。",
        article: "空を自由に飛び回る夢は、あなたのエネルギーが満ち溢れている証拠。新しい挑戦を始めるのに最適なタイミングかもしれません。",
        situations: [
            { title: "低空飛行をする", description: "理想と現実のギャップを感じているサイン。慎重な行動が求められます。" },
            { title: "誰かと一緒に飛ぶ", description: "対人関係の好転。信頼できるパートナーが現れるかもしれません。" }
        ]
    }
];

export const mockGuides: Guide[] = [
    {
        id: "g1",
        slug: "meaning-of-dreams",
        title: "夢占いとは？",
        fullTitle: "夢占いとは？なぜ夢を見るのか、夢が教える心理メッセージの基本",
        description: "夢占いの歴史や仕組み、そして私たちの生活にどう活かせるのか。初心者向けにやさしく解説します。",
        category: "夢占いの基礎知識",
        publishedDate: "2026-01-22"
    },
    {
        id: "g2",
        slug: "lucky-dreams",
        title: "金運・幸運の夢",
        fullTitle: "金運が上がる！？宝くじが当たる前兆と言われる「幸運の夢」5選",
        description: "白蛇、火事、身動きが取れない夢…一見怖そうでも実は大吉夢かも？金運や対人運が上昇するサインを厳選して解説します。",
        category: "象徴と意味",
        publishedDate: "2026-01-22"
    }
];
