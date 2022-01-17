/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../nano.ts";

type Props = {
  baseUrl: string;
  text: string;
  timestamp: number;
};

export const Button = ({ baseUrl, text, timestamp }: Props) => {
  const tweetText = text + baseUrl + timestamp;

  return (
    <a id="tweet" href={`https://twitter.com/intent/tweet?text=${tweetText}`}>
      ツイート
    </a>
  );
};
