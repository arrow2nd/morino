import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import { getAsset, hasAsset } from "./lib/asset.js";
import { getPage } from "./lib/page.js";

console.log("Listening on http://localhost:8000");

serve((req) => {
  const { pathname, searchParams } = new URL(req.url);

  // アセット
  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  // ページ
  return getPage(searchParams);
});
