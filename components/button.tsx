/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../nano.ts";

type Props = {
  url: string;
  second: number;
};

export const Button = ({ url, second }: Props) => {
  const text = second > 0
    ? `杜野凛世さんのお誕生日まで残り ${second} 秒です！`
    : "杜野凛世さんは本日がお誕生日です！！！！！🎉🎉";

  const tweetText = encodeURIComponent(`${text}\n${url}`);

  return (
    <a
      class="tweet-btn"
      href={`https://twitter.com/intent/tweet?text=${tweetText}`}
    >
      ツイート
    </a>
  );
};
