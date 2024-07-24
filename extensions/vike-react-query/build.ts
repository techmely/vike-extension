import { execSync } from "node:child_process";

execSync("rm -rf dist");
execSync("bun run build.tsup");
// await Bun.build({
//   entrypoints: tsFiles,
//   outdir: "dist",
//   target: "node",
//   format: "esm",
//   splitting: true,
//   sourcemap: "inline",
//   external: ["*"],
//   define: {
//     "process.env.NODE_ENV": "'production'",
//   },
// });

execSync("bun run tsc --emitDeclarationOnly --outDir dist");
execSync("mv dist/src/* dist");
execSync("cp src/typing.d.ts dist");
execSync("rm -rf dist/tsconfig.tsbuildinfo");
execSync("rm -rf dist/src");
