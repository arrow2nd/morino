import {
  birth,
  calcSecond2Birthday,
  embedData2Text,
  getNowJstDate,
} from "./common.js";

let nowDate = getNowJstDate();
let intervalId = 0;
let second = 0;

function happyBirthDay() {
  second = 0;
  clearInterval(intervalId);

  document.body.addEventListener("click", function (_e) {
    party.confetti(this, {
      count: party.variation.range(20, 40),
    });
  });

  document.getElementById("content").innerHTML = `
  <div class="hpb">
    <div>杜野凛世さんは</div>
    <div>本日がお誕生日です！！！！！🎉🎉</div>
  </div>
  `;
}

function update() {
  const nextDate = getNowJstDate();

  // 日付が変わったらリロード
  if (nextDate.getDate() !== nowDate.getDate()) {
    location.reload(true);
  }

  nowDate = nextDate;

  // 誕生日かどうか
  if (nowDate.getMonth() === birth.mon && nowDate.getDate() === birth.day) {
    happyBirthDay();
    return;
  }

  second = calcSecond2Birthday(nowDate);

  if (second >= 0) {
    document.getElementById("seconds").innerHTML = second;
  }
}

intervalId = setInterval(update, 1000);
update();

// ツイート用のURLを設定
document.getElementById("tweet").onclick = () => {
  const text = second > 0
    ? `杜野凛世さんのお誕生日まで残り ${second} 秒です！`
    : "杜野凛世さんは本日がお誕生日です！！！！！🎉🎉";

  const data = new Map([
    ["tweetText", encodeURIComponent(`${text}\n`)],
    ["timestamp", encodeURIComponent(`&t=${nowDate.getTime()}`)],
  ]);

  const url = embedData2Text(
    document.getElementById("tweet").href,
    data,
  );

  document.getElementById("tweet").href = url;
};
