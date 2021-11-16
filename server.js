import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { listenAndServe } from "https://deno.land/std@0.112.0/http/server.ts";
import { hasAsset, getAsset } from "./lib/assets.js";
import { getOgImage } from "./lib/ogp.js";

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (hasAsset(pathname)) {
    return getAsset(pathname);
  } else if (pathname.startsWith("/ogp")) {
    return getOgImage(pathname);
  }

  const body = await Deno.readFile("./assets/index.html");
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

await listenAndServe(":8080", (req) => handleRequest(req));
