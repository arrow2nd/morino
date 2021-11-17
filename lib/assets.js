const assets = new Object({
  "/favicon.ico": "image/x-icon",
  "/style.css": "text/css",
  "/apple-touch-icon.png": "image/png",
  "/script.js": "text/javascript",
  "/common.js": "text/javascript",
});

/**
 * 存在するか
 * @param {string} path パス
 */
export function hasAsset(path) {
  return Object.prototype.hasOwnProperty.call(assets, path);
}

/**
 * 取得
 * @param {string} path パス
 * @returns HTTPレスポンス
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
