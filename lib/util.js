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
  const diffMin = 9 * 60; // 時差
  const jstTime = timestamp +
    ((new Date().getTimezoneOffset() + diffMin) * 60 * 1000);

  return new Date(jstTime);
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
 * @param {Date} d Dateオブジェクト
 * @return {number} 残り秒数
 */
export function calcSecond2Birthday(d) {
  const { mon, day } = birth;

  let birthYear = d.getFullYear();

  // 誕生日を過ぎているなら来年にする
  if (d.getMonth() > mon || (d.getMonth() === mon && d.getDate() >= day + 1)) {
    birthYear += 1;
  }

  // 引数のdateは環境によってTZが異なるのでnew Date()を使ってTZを合わせる
  const nextBirthday = new Date(birthYear, mon, day, 0, 0, 0);

  return Math.floor((nextBirthday.getTime() - d.getTime()) / 1000);
}

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

/**
 * YYYY-M-D形式の日付文字列を作成
 * @param {Date} date Dateオブジェクト
 * @returns {string} 日付文字列
 */
export function createDateString(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}
