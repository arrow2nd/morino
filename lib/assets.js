const assets = new Object({
  "/favicon.ico": "image/x-icon",
  "/style.css": "text/css",
  "/apple-touch-icon.png": "image/png",
  "/script.js": "text/javascript",
});

/**
 * @param {string} url URL
 */
export function hasAsset(url) {
  return Object.prototype.hasOwnProperty.call(assets, url);
}

/**
 * @param {string} url URL
 */
export async function getAsset(url) {
  const asset = await Deno.readFile("./assets" + url);

  return new Response(asset, {
    status: 200,
    headers: {
      "content-type": assets[url],
    },
  });
}
