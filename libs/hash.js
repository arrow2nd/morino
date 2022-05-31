import { crypto } from "../deps.js";

import { convJstDate, createDateString, getNowJstDate } from "./date.js";

/**
 * ハッシュを計算
 * @param {string} text テキスト
 * @return {string} ハッシュ値
 */
export function md5(text) {
  const data = new TextEncoder().encode(text);
  const hash = crypto.subtle.digestSync("MD5", data);

  return [...new Uint8Array(hash)]
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * ハッシュを検証
 * @param {string | null} hash 検証するハッシュ値
 * @param {number | null} timestamp タイムスタンプ
 * @param {string | undefined} secret シークレット
 * @return {boolean}
 */
export function verification(hash, timestamp, secret) {
  const now = getNowJstDate().getTime();

  if (!hash || !timestamp || now < timestamp) {
    return false;
  }

  const date = createDateString(convJstDate(timestamp));

  return md5(date + secret) === hash;
}
