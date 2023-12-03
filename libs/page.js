import { md5 } from "./hash.js";
import { getOgImageUrl } from "./ogp.js";
import { createDateString, getNowJstDate } from "./date.js";
import { embedData2Text } from "./util.js";

/**
 * ページを取得
 * @param {string} url ベースURL
 * @param {URLSearchParams} params URLパラメータ
 * @return {Promise<Response>} HTTPレスポンス
 */
export async function getPage(url, params) {
  const ogImageUrl = getOgImageUrl(params);

  // 今日の日付をベースにハッシュを作成
  const nowDate = createDateString(getNowJstDate());
  const dateHash = md5(nowDate + Deno.env.get("APP_SECRET"));

  // URL作成
  const baseUrl = new URL(url);
  baseUrl.searchParams.append("h", dateHash);

  const data = new Map([
    ["ogImage", ogImageUrl],
    ["baseUrl", baseUrl.toString()],
  ]);

  // データを埋め込む
  const html = embedData2Text(
    await Deno.readTextFile("./assets/index.html"),
    data,
  );

  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html" },
  });
}
