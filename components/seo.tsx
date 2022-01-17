/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, Helmet } from "../nano.ts";

type Props = {
  ogImage: string;
};

export const SEO = ({ ogImage }: Props) => (
  <Helmet>
    <meta
      name="description"
      content="杜野凛世さんのお誕生日までの秒数をカウントします"
    />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="arrow_2nd" />
    <meta name="twitter:title" content="杜野凛世さんのお誕生日まで…" />
    <meta
      name="twitter:description"
      content="杜野凛世さんのお誕生日までの秒数をカウントします"
    />
    <meta name="twitter:image" content={ogImage} />
    <title>杜野凛世さんのお誕生日まで…</title>
  </Helmet>
);
