import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.114.0/encoding/base64url.ts";

/**
 * Cloudinaryの署名付きURLを作成
 * @param {string} trans transformation
 * @param {string} pubId public id
 * @returns URL
 */
export async function createCloudinaryURL(trans, pubId) {
  const baseUrl = `https://res.cloudinary.com/${Deno.env.get(
    "CLOUDINARY_CLOUDNAME"
  )}/image/upload`;

  const toSign = `${trans}/${pubId}`;
  const data = new TextEncoder().encode(
    toSign + Deno.env.get("CLOUDINARY_SECRET")
  );

  const signature = `s--${encode(
    await crypto.subtle.digest("sha-1", data)
  ).slice(0, 8)}--`;

  return [baseUrl, signature, toSign].join("/");
}

/**
 * URLをパース
 * @param {string} path パス
 * @returns
 */
export function parseUrlParam(path) {
  return path.replace("/ogp/", "").split("/");
}
