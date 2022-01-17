import * as esbuild from "https://deno.land/x/esbuild@v0.14.10/mod.js";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const { files } = await Deno.emit("./client.tsx", {
  bundle: "module",
  compilerOptions: {
    jsxFactory: "h",
    target: "es2015",
    module: "es2015",
  },
});

// minify
const { code } = await esbuild.transform(files["deno:///bundle.js"], {
  minify: true,
});

// write
Deno.writeTextFileSync("./assets/bundle.js", code);

esbuild.stop();

console.log("[Build Success]");
