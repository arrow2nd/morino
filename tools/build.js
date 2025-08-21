import * as esbuild from "esbuild";
import { bundle } from "@deno/emit";

console.log("[Build Start]");

const result = await bundle("./client.js", {
  bundle: "module",
  inlineSourceMap: false,
  sourceMap: false,
});

// minify
const { code } = await esbuild.transform(result.code, {
  minify: true,
});

Deno.writeTextFileSync("./assets/bundle.js", code);

esbuild.stop();

console.log("[Build Success]");
