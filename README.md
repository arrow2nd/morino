# morino

凛世さんのお誕生日までの秒数をカウントダウンするやつ

[![deno deploy](https://img.shields.io/badge/deno-deploy-green?logo=deno)](https://morino.deno.dev)
[![杜野凛世](https://img.shields.io/badge/SHINY%20COLORS-%E6%9D%9C%E9%87%8E%E5%87%9B%E4%B8%96-89C3EB?style=flat)](https://idollist.idolmaster-official.jp/detail/50022)

## .env

```txt
BASE_URL=[ページのURL]
APP_SECRET=[シークレット文字列（なんでも）]
CLOUDINARY_CLOUDNAME=[CloudinaryのCloud Name]
CLOUDINARY_SECRET=[CloudinaryのAPI Secret]
```

## Run

```sh
vr build && vr start
```

### build

```sh
deno run --allow-net --allow-read --allow-write --allow-env --allow-run --unstable ./tools/build.js

# or

vr build
```

### serve

```sh
deno run --allow-net=:8000 --allow-read --allow-env --watch ./server.js

# or

vr start
```
