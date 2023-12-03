import "https://deno.land/x/dotenv@v3.2.2/load.ts";

import { getAsset, hasAsset } from "./libs/asset.js";
import { getPage } from "./libs/page.js";

Deno.serve((req) => {
  const { pathname, searchParams } = new URL(req.url);

  // 存在するアセットのパスなら返す
  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  return getPage(req.url, searchParams);
});
