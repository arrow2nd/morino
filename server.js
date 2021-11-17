import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { listenAndServe } from "https://deno.land/std@0.112.0/http/server.ts";
import { getAsset, hasAsset } from "./lib/assets.js";
import { getPage } from "./lib/page.js";

function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  return getPage(searchParams);
}

// TODO: std@0.114.0での変更に対応
await listenAndServe(":8080", (req) => handleRequest(req));
