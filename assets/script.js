const birth = {
  mon: 10 - 1,
  day: 19,
};

window.onload = () => {
  let intervalId = 0;
  let second = 0;

  function hpb() {
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
    const jst = new Date().toLocaleString({ timeZone: "Asia/Tokyo" });
    const now = new Date(jst);

    if (now.getMonth() === birth.mon && now.getDate() === birth.day) {
      hpb();
      return;
    }

    const birthday = new Date(now.getFullYear(), birth.mon, birth.day);
    const endYear = birthday < now ? now.getFullYear() + 1 : now.getFullYear();
    const end = new Date(endYear, birth.mon, birth.day);

    second = (end - now) / 1000;

    if (second >= 0) {
      document.getElementById("seconds").innerHTML = second;
    }
  }

  intervalId = setInterval(update, 1000);
  update();

  document.getElementById("tweet").onclick = () => {
    const text =
      second > 0
        ? `杜野凛世さんのお誕生日まで残り ${second} 秒です！`
        : "杜野凛世さんは本日がお誕生日です！！！！！🎉🎉";

    const url = `https://twitter.com/intent/tweet?text=${encodeURI(
      text
    )}&url=https://morino.deno.dev/`;

    document.getElementById("tweet").href = url;
  };
};
