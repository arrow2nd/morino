import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import { getAsset, hasAsset } from "./lib/asset.js";
import { getPage } from "./lib/page.js";

serve((req) => {
  const { pathname, searchParams } = new URL(req.url);

  // 存在するアセットのパスなら返す
  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  return getPage(searchParams);
});

console.log(`Listening on ${Deno.env.get("BASE_URL")}`);
