import { datetime } from "https://deno.land/x/ptera/mod.ts";
import { embedData2Text } from "../assets/common.js";
import { getOgImageUrl } from "./ogp.js";
import { createDateString, md5 } from "./util.js";

/**
 * ページを取得
 * @param {URLSearchParams} params URLパラメータ
 * @return {Promise<Response>} HTTPレスポンス
 */
export async function getPage(params) {
  const ogImageUrl = await getOgImageUrl(params);

  // 今日の日付をベースにハッシュを作成
  const timestamp = parseInt(datetime().toZonedTime("Asia/Tokyo").format("x"));
  const nowDate = createDateString(timestamp);
  const dateHash = await md5(nowDate + Deno.env.get("APP_SECRET"));

  const data = new Map([
    ["ogImage", ogImageUrl],
    ["baseUrl", encodeURIComponent(`${Deno.env.get("BASE_URL")}?h=${dateHash}`)],
  ]);

  const html = embedData2Text(
    await Deno.readTextFile("./assets/index.html"),
    data,
  );

  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
