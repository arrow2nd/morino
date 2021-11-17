import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.114.0/encoding/base64url.ts";
import { verification, calcSecond2Birthday } from "./util.js";

/**
 * CloudinaryのURLを作成
 * @param {string} trans Transformation
 * @param {string} pubId Public ID
 * @return URL
 */
async function createCloudinaryUrl(trans, pubId) {
  const baseUrl = `https://res.cloudinary.com/${
    Deno.env.get(
      "CLOUDINARY_CLOUDNAME",
    )
  }/image/upload`;

  // 署名を作成
  const toSign = `${trans}/${pubId}`;
  const data = new TextEncoder().encode(
    toSign + Deno.env.get("CLOUDINARY_SECRET"),
  );

  const signature = `s--${
    encode(
      await crypto.subtle.digest("SHA-1", data),
    ).slice(0, 8)
  }--`;

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

  const second = calcSecond2Birthday(timestamp)
  return await createCloudinaryUrl(
    `$second_!${second}!/t_morino-ogp`,
    "morino/ogp-base.png",
  );
}
