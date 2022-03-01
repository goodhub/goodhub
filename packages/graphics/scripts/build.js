const { build } = require('esbuild')

const entryFile = './src/index'
const shared = {
  bundle: true,
  external: Object.keys(require('../package.json').dependencies),
  entryPoints: [entryFile],
  logLevel: 'info',
  minify: false,
  sourcemap: true,
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['esnext', 'node12.22.0'],
})

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['esnext', 'node12.22.0'],
})
