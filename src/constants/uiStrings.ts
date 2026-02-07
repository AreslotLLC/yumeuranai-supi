import { siteConfig } from "@/lib/siteConfig";

export const uiStrings = {
    home: {
        hero: {
            tagline: "Unravel Your Dreams",
            titleLine1: "夢が教える、",
            titleLine2: "未来への叡智",
            description: "意識の深淵に眠るサインを、5,000以上の象徴から解き明かす。\nあなたの運命を、より良き方向へと導きます。",
            ctaSearch: "夢を占う",
            ctaGuide: "知識を深める",
            altHeroMain: "夢の象徴",
        },
        categories: {
            title: "カテゴリから夢を解く",
        },
        featuredGuides: {
            title: "夢占いを学ぶ",
            description: "夢占いの基本や、スピリチュアルな意味を深く知るためのガイド記事です。",
            viewAll: "すべて見る",
            readMore: "続きを読む",
        },
        trust: {
            title: "私たちの夢分析について",
            description: "夢占い.tokyoでは、心理学的なアプローチと伝統的な解釈を組み合わせ、多角的な視点から夢の意味を提供しています。",
        },
        faq: {
            title: "よくあるご質問",
            items: [
                {
                    question: "夢占いとは何ですか？",
                    answer: "夢占いは、睡眠中に見る夢の内容を分析し、あなたの現在の心理状態や近い未来に起こる出来事、あるいは深層心理からのメッセージを読み解くものです。"
                },
                {
                    question: "怖い夢（悪夢）を見たのですが、悪いことが起こりますか？",
                    answer: "必ずしもそうではありません。夢占いにおいて逆夢（さかゆめ）といって、夢の内容と現実が逆になるケースも多いです。また、悪夢はストレスの発散や、注意を促すメッセージであることもあります。"
                },
                {
                    question: "起きたら夢の内容を忘れてしまいます。どうすればいいですか？",
                    answer: "枕元にノートとペンを用意しておき、目が覚めた瞬間にキーワードだけでも書き留める「夢日記」をつけるのがおすすめです。習慣化することで夢を覚えやすくなります。"
                }
            ]
        }
    },
    footer: {
        description: `あなたの${siteConfig.topicName}が教える運命のサイン。${siteConfig.name}は、心理学的なアプローチと伝統的な解釈を組み合わせ、多くの象徴からあなたの深層心理を読み解く日本最大級のポータルサイトです。`,
        navGuides: `${siteConfig.topicName}ガイド`,
        navSite: "サイト情報",
        tagline: `Unlocking the wisdom of your ${siteConfig.topicKeyword}.`,
    },
    common: {
        uncategorized: "未分類",
        loading: "読み込み中...",
        error: "エラーが発生しました",
        home: "ホーム",
        back: "戻る",
        readMore: "詳しく読む",
    },
    guide: {
        index: {
            title: `${siteConfig.topicName}ガイド一覧`,
            heroTitle: `${siteConfig.topicKeyword}のメッセージを読み解く`,
            heroSubtitle: `${siteConfig.topicName}完全ガイド`,
            heroDescription: "知識を深め、より良い未来へ。基本から応用の知識を詳しく解説します。",
            viewAll: "全記事を見る",
        },
        article: {
            recommended: "こちらの記事もおすすめです",
        },
        breadcrumbs: {
            index: `${siteConfig.topicName}ガイド一覧`,
        }
    },
    dictionary: {
        index: {
            title: `${siteConfig.topicName}辞典`,
            heroTagline: `${siteConfig.topicKeyword}の象徴を見つける`,
            heroTitle: `${siteConfig.topicName}辞典`,
            heroDescriptionLine1: `昨夜の${siteConfig.topicKeyword}に隠された、魂からのメッセージ。`,
            heroDescriptionLine2: "キーワードからあなたの深層心理を紐解きましょう。",
            popularTitle: "人気のキーワード",
            categoryTitle: "カテゴリから探す",
            basicsTitle: `${siteConfig.topicName}の基礎知識`,
            basicsDescription: `なぜ人は${siteConfig.topicKeyword}を見るのでしょうか？深層心理が送るメッセージの受け取り方をご紹介します。`,
            luckyTitle: "幸運の前兆を知る",
            luckyDescription: `最近見た${siteConfig.topicKeyword}の中で一番印象的だったものは何ですか？新着のキーワードをチェックしましょう。`,
        },
        search: {
            placeholder: "キーワードを入力...",
            button: "検索",
            ctaTitle: "キーワードを今すぐ探す",
            ctaDescription: "気になった「あの言葉」には、どんな意味があるのでしょうか？多くのデータから、あなたの疑問を解き明かします。",
            ctaButton: `${siteConfig.topicName}辞典（キーワード検索）へ`,
            title: "検索結果",
            heroTitle: `${siteConfig.topicKeyword}の検索結果`,
            noQuery: `${siteConfig.topicKeyword}のキーワードを入力してください`,
            resultCount: (q: string, count: number) => `「${q}」の検索結果: ${count}件`,
            noResults: `一致する${siteConfig.topicKeyword}が見見つかりませんでした`,
            noResultsDescription: (q: string) => `「${q}」に一致する象徴が見つかりませんでした。別のキーワードや、ひらがな・漢字を変えて検索してみてください。`,
            popularTitle: `人気の${siteConfig.topicKeyword}キーワード`,
            popularSubtitle: "多くの人が調べている注目のキーワードから探す",
            backToIndex: `${siteConfig.topicName}辞典のトップへ`,
        },
        detail: {
            metaTitle: (title: string) => `${title}｜${title}の${siteConfig.topicName}の意味と心理｜${siteConfig.name}`,
            metaDescription: (title: string, keywords: string) => `${title}。${keywords}の${siteConfig.topicKeyword}が暗示する意味を詳しく解説。`,
            heroDescription: (title: string) => `${title}の${siteConfig.topicKeyword}が教える、あなたの深層心理と未来へのメッセージ。`,
            symbolismTitle: `${siteConfig.topicKeyword}が象徴する意味`,
            symbolismDefault: (title: string) => `${title}は、一般的にあなたの内面的な変化や、現在直面している課題を象徴しています。`,
            situationTitle: "シチュエーション別の暗示",
            adviceTitle: "運気を好転させるアドバイス",
            adviceDescription: `この${siteConfig.topicKeyword}を見た後は、直感を信じて行動することが大切です。${siteConfig.topicKeyword}が教えてくれたサインを無視せず、日々の生活の中に小さな変化を取り入れてみてください。`,
            adviceCta: `${siteConfig.topicKeyword}日記の付け方を学ぶ`,
            relatedTitle: `関連する${siteConfig.topicKeyword}のキーワード`,
        },
        category: {
            metaTitle: (name: string) => `${name}の${siteConfig.topicName}一覧 | ${siteConfig.name}`,
            metaDescription: (name: string) => `${name}に関する${siteConfig.topicName}のキーワード一覧です。それぞれの${siteConfig.topicKeyword}が暗示する深層心理や意味を詳しく解説しています。`,
            heroDescriptionLine1: (name: string) => `${name}に関する${siteConfig.topicKeyword}に隠された、あなたの深層心理からのメッセージ。`,
            heroDescriptionLine2: "気になるキーワードを選んで、その意味を読み解きましょう。",
            listTitle: (name: string) => `${name}のキーワード一覧`,
            noItems: "該当するキーワードがまだ登録されていません。",
            otherCategories: "他のカテゴリから探す",
        }
    }
};
