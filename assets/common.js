/**
 * 杜野凛世さんのお誕生日（10/19）
 */
export const birth = {
  mon: 10 - 1,
  day: 19,
};

/**
 * JSTの時差を考慮したDateに変換
 * @param {number} timestamp タイムスタンプ
 * @return {Date} Dateオブジェクト
 */
export function convJstDate(timestamp) {
  const diffMin = 9 * 60;
  return new Date(
    timestamp + ((new Date().getTimezoneOffset() + diffMin) * 60 * 1000),
  );
}

/**
 * JSTの時差を考慮した現在のDateを取得
 * @return {Date} Dateオブジェクト
 */
export function getNowJstDate() {
  return convJstDate(Date.now());
}

/**
 * 凛世さんのお誕生日までの秒数を計算
 * @param {Date} date Dateオブジェクト
 * @return {number} 残り秒数
 */
export function calcSecond2Birthday(date) {
  const birthYear = (date.getMonth() > birth.mon ||
      date.getMonth() === birth.mon && date.getDate() >= birth.mon + 1)
    ? date.getFullYear() + 1
    : date.getFullYear();

  // 引数のdateは環境によってTZが異なるのでnew Date()を使ってTZを合わせる
  const nextBirthday = new Date(birthYear, birth.mon, birth.day, 0, 0, 0);

  return Math.floor((nextBirthday - date) / 1000);
}

/**
 * テキストにデータを埋め込む
 * @param {string} text 対象の文字列
 * @param {Map<string, string>} data 埋め込むデータ
 * @return {string} 埋め込み後の文字列
 */
export function embedData2Text(text, data) {
  data.forEach((val, key) => {
    text = text.replaceAll(`{{${key}}}`, val);
  });

  return text;
}
