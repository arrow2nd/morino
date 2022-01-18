import * as esbuild from "https://deno.land/x/esbuild@v0.14.10/mod.js";

console.log("[Build Start]");

const file = await Deno.readTextFile("./client.js");

// minify
const { code } = await esbuild.transform(file, {
  format: "esm",
  target: "es2015",
  minify: true,
});

Deno.writeTextFileSync("./assets/bundle.js", code);

esbuild.stop();

console.log("[Build Success]");
