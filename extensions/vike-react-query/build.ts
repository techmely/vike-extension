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
  define: {
    "process.env.NODE_ENV": "'production'",
  },
});

execSync("bun run tsc --emitDeclarationOnly --outDir dist");
execSync("mv dist/src/providers/* dist/providers");
execSync("mv dist/src/components/* dist/components");
execSync("mv dist/src/+config.d.ts dist");
execSync("mv dist/src/index.d.ts dist");
execSync("cp src/typing.d.ts dist");
execSync("rm -rf dist/tsconfig.tsbuildinfo");
execSync("rm -rf dist/src");
