/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import { h } from "./nano.ts";
import { App } from "./components/App.tsx";

import { hasAsset, getAsset } from "./lib/assets.ts";
import { createPage } from "./lib/page.ts";

const handler = async (req: Request): Promise<Response> => {
  const { pathname, searchParams } = new URL(req.url);

  // アセット
  if (hasAsset(pathname)) {
    return await getAsset(pathname);
  }

  // ページ
  return new Response(createPage(<App params={searchParams} />), {
    status: 200,
    headers: { "content-type": "text/html" },
  });
};

console.log("Listening on http://localhost:8000");
serve(handler);
