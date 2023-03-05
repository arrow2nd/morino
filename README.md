# morino

凛世さんのお誕生日までの秒数をカウントダウンするやつ

[![deno deploy](https://img.shields.io/badge/deno-deploy-green?logo=deno)](https://morino.deno.dev)
[![Deno](https://shields.io/badge/deno-%5E1.20-green?logo=deno&style=flat)](https://deno.land)
[![杜野凛世](https://img.shields.io/badge/SHINY%20COLORS-%E6%9D%9C%E9%87%8E%E5%87%9B%E4%B8%96-89C3EB?style=flat)](https://idollist.idolmaster-official.jp/detail/50022)

## 準備

以下の内容で `.env` を作成する

```txt
BASE_URL=[ページのURL]
APP_SECRET=[シークレット文字列（なんでも）]
CLOUDINARY_CLOUDNAME=[CloudinaryのCloud Name]
CLOUDINARY_SECRET=[CloudinaryのAPI Secret]
```

## 実行

```sh
deno task start
```

## Thanks!

- https://github.com/foooomio/neet
