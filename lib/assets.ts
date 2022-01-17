const assets = new Map<string, HeadersInit>([
  ["/favicon.ico", { "content-type": "image/x-icon" }],
  ["/apple-touch-icon.png", { "content-type": "image/png" }],
  ["/ogp.png", { "content-type": "image/png" }],
  ["/ogp-hpb.png", { "content-type": "image/png" }],
  ["/bundle.js", { "content-type": "text/javascript" }],
  ["/style.css", { "content-type": "text/css" }],
]);

/**
 * アセットに存在するか
 * @param path パス
 * @return 結果
 */
export function hasAsset(path: string): boolean {
  return assets.has(path);
}

/**
 * アセットを取得
 * @param path パス
 * @return HTTPレスポンス
 */
export async function getAsset(path: string): Promise<Response> {
  const asset =
    path === "/bundle.js"
      ? await generateBundle()
      : await Deno.readFile("./assets" + path);

  return new Response(asset, {
    status: 200,
    headers: assets.get(path),
  });
}

/**
 * bundle.jsを生成
 * @returns JavaScript文字列
 */
async function generateBundle(): Promise<string> {
  const { files } = await Deno.emit("./client.tsx", {
    bundle: "module",
    compilerOptions: {
      jsxFactory: "h",
      target: "es2015",
      module: "es2015",
    },
  });

  return files["deno:///bundle.js"];
}
