import * as esbuild from "esbuild";
// import t from "./package.json" assert { type: "json" };
import { readdir } from "fs/promises";
import { resolve } from "path";

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  const stack = [];
  for await (const f of getFiles("src")) {
    stack.push(f);
  }

  await esbuild.build({
    entryPoints: stack.filter(
      f =>
        !f.endsWith("types.ts") &&
        !f.endsWith("handler.ts") &&
        (f.endsWith(".ts") || f.endsWith(".mts"))
    ),
    platform: "node",
    target: "node16",
    outdir: "dist",
    tsconfig: "./tsconfig.json",
    // format: "cjs",
    bundle: false,
    // outExtension: { ".js": ".mjs" },
    // external: Object.keys(t.dependencies).concat(Object.keys(t.devDependencies)),
  });
})();
