# morino

> ⚠️ nanoJSX実装版。誕生日になった際の演出が未実装。作業してたら なんか違うな… ってなったのでやめた。

凛世さんのお誕生日までの秒数をカウントダウンするやつ

[![deno deploy](https://img.shields.io/badge/deno-deploy-green?logo=deno)](https://morino.deno.dev)
[![杜野凛世](https://img.shields.io/badge/SHINY%20COLORS-%E6%9D%9C%E9%87%8E%E5%87%9B%E4%B8%96-89C3EB?style=flat)](https://idollist.idolmaster-official.jp/detail/50022)

## .env

```
BASE_URL=ページのURL
APP_SECRET=シークレット文字列（なんでも）
CLOUDINARY_CLOUDNAME=CloudinaryのCloud Name
CLOUDINARY_SECRET=CloudinaryのAPI Secret
```

## Run

```sh
# build & serve
vr build && ve start
```
