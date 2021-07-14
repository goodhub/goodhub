import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import path from 'path';
const packageJsonPath = path.resolve(__dirname, '../../package.json');

export default {
  input: "./index.ts",
  output: {
    file: "../../dist/index.js",
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    peerDepsExternal({ packageJsonPath }),
    resolve(),
    commonjs(),
    typescript({ tsconfigDefaults: { compilerOptions: { declaration: true }} }),
    postcss()
  ],
  watch: {
    include: './**'
  }
};
