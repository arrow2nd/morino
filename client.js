import {
  birth,
  calcSecond2Birthday,
  embedData2Text,
  getNowJstDate,
} from "./lib/util.js";

let nowDate = getNowJstDate();
let intervalId = 0;
let second = 0;

const happyBirthDay = () => {
  second = 0;
  clearInterval(intervalId);

  // クリックで紙吹雪
  document.body.addEventListener("click", function (_e) {
    party.confetti(this, {
      count: party.variation.range(20, 40),
    });
  });

  // カウントダウン部分を差し替え
  document.getElementById("content").innerHTML = `
  <div class="hpb">
    <div>杜野凛世さんは</div>
    <div>本日がお誕生日です！！！！！🎉🎉</div>
  </div>
  `;
};

const update = () => {
  const nextDate = getNowJstDate();

  // 日付が変わったらリロード
  if (nextDate.getDate() !== nowDate.getDate()) {
    location.reload();
  }

  // 誕生日かどうか
  if (nextDate.getMonth() === birth.mon && nextDate.getDate() === birth.day) {
    happyBirthDay();
    return;
  }

  nowDate = nextDate;
  second = calcSecond2Birthday(nextDate);

  // カウントダウンを更新
  document.getElementById("second").innerText = second;
};

// 1秒毎に更新
intervalId = setInterval(update, 1000);
update();

// クリック時にツイート用のURLを設定
document.getElementById("tweet-btn").onclick = () => {
  const text = second > 0
    ? `杜野凛世さんのお誕生日まで残り ${second} 秒です！`
    : "杜野凛世さんは本日がお誕生日です！！！！！🎉🎉";

  const data = new Map([
    ["tweetText", encodeURIComponent(`${text}\n`)],
    ["timestamp", encodeURIComponent(`&t=${nowDate.getTime()}`)],
  ]);

  const url = embedData2Text(
    document.getElementById("tweet-btn").href,
    data,
  );

  document.getElementById("tweet-btn").href = url;
};
