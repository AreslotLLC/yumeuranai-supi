/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// カテゴリー別の色設定
const categoryColors: Record<
    string,
    { bg: string; accent: string; text: string }
> = {
    furniture: {
        bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
        accent: "#d97706",
        text: "#78350f",
    },
    electronics: {
        bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
        accent: "#2563eb",
        text: "#1e3a8a",
    },
    clothes: {
        bg: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)",
        accent: "#db2777",
        text: "#831843",
    },
    books: {
        bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
        accent: "#059669",
        text: "#064e3b",
    },
    valuables: {
        bg: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)",
        accent: "#7c3aed",
        text: "#4c1d95",
    },
    photos: {
        bg: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 50%, #fda4af 100%)",
        accent: "#e11d48",
        text: "#881337",
    },
    vehicles: {
        bg: "linear-gradient(135deg, #cffafe 0%, #a5f3fc 50%, #67e8f9 100%)",
        accent: "#0891b2",
        text: "#164e63",
    },
};

const defaultColors = {
    bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
    accent: "#475569",
    text: "#1e293b",
};

// モックデータ（airtableのEdge互換問題を回避）
const mockItems: Record<string, { title: string; categoryName: string; categorySlug: string }> = {
    "sofa-disposal": {
        title: "ソファの処分方法",
        categoryName: "家具",
        categorySlug: "furniture",
    },
    "reizouko-disposal": {
        title: "冷蔵庫の処分方法",
        categoryName: "家電",
        categorySlug: "electronics",
    },
    "sentakuki-disposal": {
        title: "洗濯機の処分方法",
        categoryName: "家電",
        categorySlug: "electronics",
    },
    "bed-disposal": {
        title: "ベッドの処分方法",
        categoryName: "家具",
        categorySlug: "furniture",
    },
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // モックから記事データ取得
    const item = mockItems[slug];

    if (!item) {
        return new Response("Not found", { status: 404 });
    }

    // カテゴリーの色を取得
    const colors = categoryColors[item.categorySlug] || defaultColors;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.bg,
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* 装飾的な円 */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.3)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-80px",
                        left: "-80px",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                    }}
                />

                {/* コンテンツカード */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "32px",
                        padding: "48px 64px",
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                        maxWidth: "1000px",
                        margin: "0 40px",
                    }}
                >
                    {/* サイト名 */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "24px",
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "#2563eb",
                        }}
                    >
                        夢占い.tokyo
                    </div>

                    {/* カテゴリーバッジ */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: colors.accent,
                            background: `${colors.accent}20`,
                            padding: "8px 24px",
                            borderRadius: "9999px",
                        }}
                    >
                        {item.categoryName}
                    </div>

                    {/* タイトル */}
                    <div
                        style={{
                            fontSize: "56px",
                            fontWeight: 800,
                            color: colors.text,
                            textAlign: "center",
                            lineHeight: 1.3,
                            maxWidth: "900px",
                            display: "flex",
                        }}
                    >
                        {item.title}
                    </div>

                    {/* サブテキスト */}
                    <div
                        style={{
                            fontSize: "24px",
                            color: "#64748b",
                            marginTop: "24px",
                            textAlign: "center",
                            display: "flex",
                        }}
                    >
                        処分方法を詳しく解説
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
