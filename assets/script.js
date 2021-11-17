import { birth, calcSecond2Birthday, embedData2Text } from "./common.js";

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
  const now = new Date();

  // 誕生日かどうか
  if (now.getMonth() === birth.mon && now.getDate() === birth.day) {
    happyBirthDay();
    return;
  }

  second = calcSecond2Birthday(now);

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
    ["timestamp", encodeURIComponent(`&t=${new Date().getTime()}`)],
  ]);

  const url = embedData2Text(
    document.getElementById("tweet").href,
    data
  );

  document.getElementById("tweet").href = url;
};
