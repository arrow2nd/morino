// deno-lint-ignore-file no-explicit-any
import { Helmet, renderSSR } from "../nano.ts";

/**
 * ページを作成
 * @param component コンポーネント
 * @returns HTML文字列
 */
export function createPage(component: any): string {
  const app = renderSSR(component);
  const { body, head, footer, attributes } = Helmet.SSR(app);

  const html = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${head.join("\n")}
  </head>
  <body ${attributes.body.toString()}>
    ${body}
    ${footer.join("\n")}
  </body>
</html>
`;

  return html;
}
