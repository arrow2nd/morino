/**
 * 杜野凛世さんのお誕生日（10/19）
 */
export const birth = {
  mon: 10 - 1,
  day: 19,
};

/**
 * JSTの時差を考慮したDateに変換
 * @param imestamp タイムスタンプ
 * @return Dateオブジェクト
 */
export function convJstDate(timestamp: number): Date {
  const diffMin = 9 * 60;

  return new Date(
    timestamp + (new Date().getTimezoneOffset() + diffMin) * 60 * 1000
  );
}

/**
 * JSTの時差を考慮した現在のDateを取得
 * @return Dateオブジェクト
 */
export function getNowJstDate(): Date {
  return convJstDate(Date.now());
}

/**
 * 凛世さんのお誕生日までの秒数を計算
 * @param d Dateオブジェクト
 * @return 残り秒数
 */
export function calcSecond2Birthday(d: Date): number {
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
