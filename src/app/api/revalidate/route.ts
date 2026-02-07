import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Airtableの更新を検知してキャッシュを更新するためのWebhookエンドポイント
 * GET /api/revalidate?secret=TOKEN&slug=snake
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get("secret");
    const slug = searchParams.get("slug"); // DreamContent slug

    // トークンチェック (環境変数が設定されていない場合は開発環境として許可)
    if (process.env.REVALIDATION_TOKEN && secret !== process.env.REVALIDATION_TOKEN) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    try {
        if (slug) {
            // 特定の夢キーワードページを更新
            revalidatePath(`/contents/${slug}`);
            revalidatePath(`/contents`, "layout");
        }

        // トップページ、サイトマップ、ガイド一覧を更新
        revalidatePath("/");
        revalidatePath("/guide", "layout");
        revalidatePath("/sitemap.xml");

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            slug: slug || "all"
        });
    } catch (err) {
        console.error("Revalidation error:", err);
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}
