/**
 * テキストにデータを埋め込む
 * @param {string} text 対象の文字列
 * @param {Map<string, string>} data 埋め込むデータ
 * @return {string} 埋め込み後の文字列
 */
export function embedData2Text(text, data) {
  for (const [key, value] of data) {
    text = text.replaceAll(`{{${key}}}`, value);
  }

  return text;
}
