import { crypto, encode } from "../deps.js";

import { verification } from "./hash.js";
import { calcSecond2Birthday, convJstDate, morinoBirth } from "./date.js";

/**
 * CloudinaryのURLを作成
 * @param {string} trans Transformation
 * @param {string} pubId Public ID
 * @return {string} URL
 */
function createCloudinaryUrl(trans, pubId) {
  const baseUrl = `https://res.cloudinary.com/${
    Deno.env.get("CLOUDINARY_CLOUDNAME")
  }/image/upload`;

  const toSign = `${trans}/${pubId}`;
  const data = new TextEncoder().encode(
    toSign + Deno.env.get("CLOUDINARY_SECRET"),
  );

  const sha1 = crypto.subtle.digestSync("SHA-1", data);
  const signature = `s--${encode(sha1).slice(0, 8)}--`;

  return [baseUrl, signature, toSign].join("/");
}

/**
 * OGP画像のURLを取得
 * @param {URLSearchParams} params パラメータ
 * @return {string} URL
 */
export function getOgImageUrl(params) {
  const checkHash = params.get("h");
  const timestamp = parseInt(params.get("t")) || null;

  // 検証に失敗したらデフォルトの画像を返す
  if (!verification(checkHash, timestamp, Deno.env.get("APP_SECRET"))) {
    return `${Deno.env.get("BASE_URL")}/ogp.png`;
  }

  const date = convJstDate(timestamp);

  // 誕生日なら専用の画像を返す
  const { mon, day } = morinoBirth;
  if (date.getMonth() === mon && date.getDate() === day) {
    return `${Deno.env.get("BASE_URL")}/ogp-hpb.png`;
  }

  const second = calcSecond2Birthday(date);
  return createCloudinaryUrl(
    `$second_!${second}!/t_morino-ogp`,
    "morino/ogp-base.png",
  );
}
