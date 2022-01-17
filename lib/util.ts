import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { convJstDate, getNowJstDate } from "./time.ts";

/**
 * ハッシュを計算
 * @param text テキスト
 * @return ハッシュ値
 */
export function md5(text: string): string {
  const data = new TextEncoder().encode(text);
  const hash = crypto.subtle.digestSync("MD5", data);

  return [...new Uint8Array(hash)]
    .map((e) => e.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * ハッシュを検証
 * @param hash 検証するハッシュ値
 * @param timestamp タイムスタンプ
 * @param secret シークレット
 * @return 検証結果
 */
export function verification(
  hash: string | undefined,
  timestamp: number,
  secret: string | undefined
): boolean {
  const now = getNowJstDate().getTime();
  if (!hash || !timestamp || now < timestamp) return false;

  const date = createDateString(convJstDate(timestamp));
  const newHash = md5(date + secret);

  return newHash === hash;
}

/**
 * YYYY-M-D形式の日付文字列を作成
 * @param date Dateオブジェクト
 * @returns 日付文字列
 */
export function createDateString(date: Date): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}
