/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, Helmet } from "../nano.ts";

import { getOgImageUrl } from "../lib/ogp.ts";
import { getNowJstDate } from "../lib/date.ts";
import { createDateString, md5 } from "../lib/util.ts";

import { CountDown } from "./countdown.tsx";
import { SEO } from "./seo.tsx";

type Props = {
  params: URLSearchParams;
};

export const App = ({ params }: Props) => {
  // 今日の日付をベースにハッシュを作成
  const nowDate = createDateString(getNowJstDate());
  const secretKey = Deno.env.get("APP_SECRET") || "";
  const dateHash = md5(nowDate + secretKey);

  // URL作成
  const ogImageUrl = getOgImageUrl(params);
  const siteUrl = encodeURIComponent(
    `${Deno.env.get("BASE_URL")}?h=${dateHash}`,
  );

  return (
    <main>
      <SEO ogImage={ogImageUrl} />
      <Helmet>
        <link rel="stylesheet" href="./style.css" />
      </Helmet>
      <div id="content">
        <CountDown siteUrl={siteUrl} />
      </div>
      <Helmet footer>
        <script src="https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js">
        </script>
        <script type="module" src="./bundle.js"></script>
      </Helmet>
    </main>
  );
};
