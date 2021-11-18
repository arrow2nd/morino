const assets = new Object({
  "/favicon.ico": "image/x-icon",
  "/apple-touch-icon.png": "image/png",
  "/ogp.png": "image/png",
  "/ogp-hpb.png": "image/png",
  "/script.js": "text/javascript",
  "/common.js": "text/javascript",
  "/style.css": "text/css",
});

/**
 * アセットに存在するか
 * @param {string} path パス
 * @return {boolean}
 */
export function hasAsset(path) {
  return Object.prototype.hasOwnProperty.call(assets, path);
}

/**
 * アセットを取得
 * @param {string} path パス
 * @return {Promise<Response>} HTTPレスポンス
 */
export async function getAsset(path) {
  const asset = await Deno.readFile("./assets" + path);

  return new Response(asset, {
    status: 200,
    headers: {
      "content-type": assets[path],
    },
  });
}
