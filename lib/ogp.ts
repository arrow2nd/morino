import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.114.0/encoding/base64url.ts";

import { birth, calcSecond2Birthday, convJstDate } from "./time.ts";
import { verification } from "./util.ts";

/**
 * CloudinaryのURLを作成
 * @param trans Transformation
 * @param pubId Public ID
 * @return URL
 */
function createCloudinaryUrl(trans: string, pubId: string): string {
  const baseUrl = `https://res.cloudinary.com/${Deno.env.get(
    "CLOUDINARY_CLOUDNAME"
  )}/image/upload`;

  const toSign = `${trans}/${pubId}`;
  const data = new TextEncoder().encode(
    toSign + Deno.env.get("CLOUDINARY_SECRET")
  );

  const sha1 = crypto.subtle.digestSync("SHA-1", data);
  const signature = `s--${encode(sha1).slice(0, 8)}--`;

  return [baseUrl, signature, toSign].join("/");
}

/**
 * OGP画像のURLを取得
 * @param params パラメータ
 * @return URL
 */
export function getOgImageUrl(params: URLSearchParams): string {
  const baseUrl = Deno.env.get("BASE_URL");
  if (!baseUrl) {
    return "";
  }

  const checkHash = params.get("h") || undefined;
  const timestamp = parseInt(params.get("t") || "0");
  const secret = Deno.env.get("APP_SECRET");

  // 検証に失敗したらデフォルトの画像を返す
  if (!verification(checkHash, timestamp, secret)) {
    return `${baseUrl}/ogp.png`;
  }

  const date = convJstDate(timestamp);

  // 誕生日なら専用の画像を返す
  if (date.getMonth() === birth.mon && date.getDate() === birth.day) {
    return `${baseUrl}/ogp-hpb.png`;
  }

  const second = calcSecond2Birthday(date);

  return createCloudinaryUrl(
    `$second_!${second}!/t_morino-ogp`,
    "morino/ogp-base.png"
  );
}
