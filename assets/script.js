// 杜野凛世さんの誕生日
const birth = {
  mon: 10 - 1,
  day: 19,
};

window.onload = () => {
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
    if (now.getMonth() === birth.mon && now.getDate() === birth.day) {
      happyBirthDay();
      return;
    }

    // 次の誕生日の日付
    const birthYear = (now.getMonth() > birth.mon ||
        now.getMonth() === birth.mon && now.getDate() >= birth.mon + 1)
      ? now.getFullYear() + 1
      : now.getFullYear();
    const nextBirthday = new Date(birthYear, birth.mon, birth.day);

    second = Math.floor((nextBirthday - now) / 1000);

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
      ["tweetText", `${text}\n`],
      ["timestamp", `&t=${new Date().getTime()}`],
    ]);

    let url = document.getElementById("tweet").href;
    data.forEach((val, key) => {
      url = url.replaceAll(`{{${key}}}`, encodeURIComponent(val));
    });

    document.getElementById("tweet").href = url;
  };
};
