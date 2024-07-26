import { defineConfig } from "tsup";
import pkg from "./package.json";

export default [
  defineConfig({
    format: ["cjs", "esm"],
    entry: ["src/*.ts*", "src/*/*.ts*", "!**/*.test.,ts"],
    outDir: "dist/src",
    sourcemap: "inline",
    clean: true,
    external: [...Object.keys(pkg.peerDependencies || {})],
  }),
];
