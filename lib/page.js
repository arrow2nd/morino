import { getOgImageUrl } from "./ogp.js";
import { createDateString, md5 } from "./util.js";

/**
 * ページを取得
 * @param {URLSearchParams} params パラメータ
 * @returns HTTPレスポンス
 */
export async function getPage(params) {
  const ogImageUrl = await getOgImageUrl(params);

  // 今日の日付からハッシュを作成
  const nowDate = createDateString(new Date().getTime());
  const dateHash = await md5(nowDate + Deno.env.get("APP_SECRET"));
  
  const data = new Map([
    ["ogImage", ogImageUrl],
    ["baseUrl", encodeURIComponent(`https://morino.deno.dev?h=${dateHash}`)],
  ]);
  
  // 埋め込む
  let html = await Deno.readTextFile("./assets/index.html");
  data.forEach((val, key) => {
    html = html.replaceAll(`{{${key}}}`, val);
  });

  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
