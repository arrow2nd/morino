import { createCloudinaryURL } from "./util.js";
import { parseUrlParam } from "./util.js";

/**
 * OGP画像を取得
 * @param {string} path パス
 * @return HTTPレスポンス
 */
export async function getOgImage(path) {
  const [second, hash] = parseUrlParam(path);

  // TODO: ハッシュを検証

  const cloudinaryUrl = await createCloudinaryURL(
    `$second_!${second}!/t_morino-ogp`,
    "morino/ogp-base.png"
  );

  const res = await fetch(cloudinaryUrl);
  return new Response(await res.blob(), {
    headers: { "content-type": "image/png" },
  });
}
