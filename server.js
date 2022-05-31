import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { serve } from "./deps.js";

import { getAsset, hasAsset } from "./libs/asset.js";
import { getPage } from "./libs/page.js";

serve((req) => {
  const { pathname, searchParams } = new URL(req.url);

  // 存在するアセットのパスなら返す
  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  return getPage(searchParams);
});

console.log(`Listening on ${Deno.env.get("BASE_URL")}`);
