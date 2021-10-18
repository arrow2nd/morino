import { hasAsset, getAsset } from "./lib/assets.js";

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (hasAsset(pathname)) {
    return getAsset(pathname);
  }

  const body = await Deno.readFile("./assets/index.html");

  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
