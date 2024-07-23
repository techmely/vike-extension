import { execSync } from "node:child_process";
import { glob } from "glob";

const tsFiles = await glob("src/**/*.ts*");

execSync("rm -rf dist");
await Bun.build({
  entrypoints: tsFiles,
  outdir: "dist",
  target: "node",
  format: "esm",
  splitting: true,
  sourcemap: "inline",
  external: ["*"],
});
execSync("bun run tsc --emitDeclarationOnly --outDir dist");
execSync("mv dist/src/* dist");
execSync("cp src/typing.d.ts dist");
execSync("rm -rf dist/tsconfig.tsbuildinfo");
execSync("rm -rf dist/src");
