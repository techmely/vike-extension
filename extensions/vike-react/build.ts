import { execSync } from "node:child_process";
import json from "./package.json";

execSync("rm -rf dist");
await Bun.build({
  entrypoints: [
    "src/index.ts",
    "src/+config.ts",
    "src/components/clientOnly.tsx",
    "src/hooks/useData.ts",
    "src/hooks/usePageContext.ts",
    "src/render/onRenderClient.tsx",
    "src/render/onRenderHtml.tsx",
  ],
  outdir: "dist",
  target: "node",
  format: "esm",
  splitting: true,
  sourcemap: "inline",
  external: ["*"],
});
execSync("bun run tsc --emitDeclarationOnly --outDir dist");
execSync("mv dist/src/components/* dist/components");
execSync("mv dist/src/hooks/* dist/hooks");
execSync("mv dist/src/providers dist/providers");
execSync("mv dist/src/render/* dist/render");
execSync("mv dist/src/utils dist");
execSync("mv dist/src/+config.d.ts dist");
execSync("mv dist/src/index.d.ts dist");
execSync("cp src/typing.d.ts dist");
execSync("rm -rf dist/tsconfig.tsbuildinfo");
execSync("rm -rf dist/src");
