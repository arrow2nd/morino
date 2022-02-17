/**
 * 杜野凛世さんのお誕生日（10/19）
 */
export const morinoBirth = {
  mon: 10 - 1,
  day: 19,
};

/**
 * JSTの時差を考慮したDateに変換
 * @param {number} timestamp タイムスタンプ
 * @return {Date} Dateオブジェクト
 */
export function convJstDate(timestamp) {
  // UTCからの日本時間の時差（分単位）
  const diffJstMin = 9 * 60;

  const jstTimeStamp = timestamp +
    ((new Date().getTimezoneOffset() + diffJstMin) * 60 * 1000);

  return new Date(jstTimeStamp);
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
  const { mon, day } = morinoBirth;

  let birthYear = date.getFullYear();

  // 誕生日を過ぎているなら来年にする
  if (
    date.getMonth() > mon ||
    (date.getMonth() === mon && date.getDate() >= day + 1)
  ) {
    birthYear += 1;
  }

  const nextBirthday = new Date(birthYear, mon, day, 0, 0, 0);

  // 環境によってTZが異なるが、仮引数のdateにはconvJstDate()で生成されたものが渡されるので
  // ズレが起きることなく計算できる
  return Math.floor((nextBirthday.getTime() - date.getTime()) / 1000);
}

/**
 * YYYY-M-D形式の日付文字列を作成
 * @param {Date} date Dateオブジェクト
 * @returns {string} 日付文字列
 */
export function createDateString(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}
