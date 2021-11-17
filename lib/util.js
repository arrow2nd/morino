import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";

/**
 * ハッシュを計算
 * @param {string} text
 * @returns ハッシュ値
 */
export async function md5(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("MD5", data);

  return [...new Uint8Array(hash)]
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * ハッシュを検証
 * @param {string | null} hash 検証するハッシュ値
 * @param {number | null} timestamp タイムスタンプ
 * @param {string} secret シークレット
 */
export async function verification(hash, timestamp, secret) {
  const now = new Date().getTime();
  if (!hash || !timestamp || now < timestamp) return false;

  const date = createDateString(timestamp);
  return await md5(date + secret) === hash;
}

/**
 * YYYY-M-D形式の日付文字列を作成
 * @param {number} timestamp タイムスタンプ
 * @returns 日付文字列
 */
export function createDateString(timestamp) {
  const d = new Date(timestamp);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
}