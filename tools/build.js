import * as esbuild from "../deps.js";

console.log("[Build Start]");

const { files } = await Deno.emit("./client.js", {
  bundle: "module",
  compilerOptions: {
    target: "es2015",
    module: "es2015",
  },
});

// minify
const { code } = await esbuild.transform(files["deno:///bundle.js"], {
  minify: true,
});

Deno.writeTextFileSync("./assets/bundle.js", code);

esbuild.stop();

console.log("[Build Success]");
