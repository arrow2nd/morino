import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.114.0/encoding/base64url.ts";
import { calcSecond2Birthday } from "../assets/common.js";
import { verification } from "./util.js";

/**
 * CloudinaryのURLを作成
 * @param {string} trans Transformation
 * @param {string} pubId Public ID
 * @return URL
 */
async function createCloudinaryUrl(trans, pubId) {
  const baseUrl = `https://res.cloudinary.com/${
    Deno.env.get("CLOUDINARY_CLOUDNAME")
  }/image/upload`;

  const toSign = `${trans}/${pubId}`;
  const data = new TextEncoder().encode(
    toSign + Deno.env.get("CLOUDINARY_SECRET"),
  );
    
  // 署名を作成
  const sha1 = await crypto.subtle.digest("SHA-1", data);
  const signature = `s--${encode(sha1).slice(0, 8)}--`;

  return [baseUrl, signature, toSign].join("/");
}

/**
 * OGP画像のURLを取得
 * @param {URLSearchParams} params パラメータ
 * @return URL
 */
export async function getOgImageUrl(params) {
  const checkHash = params.get("h");
  const timestamp = parseInt(params.get("t")) || null;

  if (!await verification(checkHash, timestamp, Deno.env.get("APP_SECRET"))) {
    return "https://morino.deno.dev/ogp.png";
  }

  const date = new Date(timestamp);

  // TODO: 誕生日なら専用の画像を返す

  const second = calcSecond2Birthday(date);
  return await createCloudinaryUrl(
    `$second_!${second}!/t_morino-ogp`,
    "morino/ogp-base.png",
  );
}
