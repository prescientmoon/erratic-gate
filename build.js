import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
import { sassPlugin } from 'esbuild-sass-plugin'
import * as fs from 'fs'

const serve = process.env.ESBUILD_SERVE === '1'
const baseurl = process.env.ESBUILD_BASEURL || ''
const nodeEnv = process.env.NODE_ENV || 'production'
const isProd = nodeEnv !== 'development'

console.log(`Building with baseurl ${baseurl}`)

const ctx = await esbuild.context({
  entryPoints: ['src/index.ts'],
  minify: isProd,
  bundle: true,
  metafile: true,
  splitting: isProd,
  outdir: 'dist',
  format: 'esm',
  target: ['es2020'],
  assetNames: 'assets/[name]',
  chunkNames: 'chunks/[name]',
  loader: {
    '.svg': 'file'
  },
  define: {
    'process.env.BASEURL': JSON.stringify(baseurl),
    'process.env.NODE_ENV': JSON.stringify(nodeEnv)
  },
  plugins: [
    htmlPlugin({
      files: [
        {
          filename: 'index.html',
          entryPoints: ['src/index.ts'],
          favicon: 'public/favicon.ico',
          htmlTemplate: 'public/index.html',
          scriptLoading: 'module'
        }
      ]
    }),
    sassPlugin({})
  ],
  publicPath: baseurl
})

if (serve) {
  await ctx.watch()
  const { port, host } = await ctx.serve({
    servedir: 'dist',
    fallback: 'dist/index.html'
  })
  console.log(`Serving on ${host}:${port}`)
} else {
  await ctx.rebuild()
  await ctx.dispose()
  fs.cpSync('./dist/index.html', './dist/404.html') // Needed to please github pages
  console.log(`Project bundled successfully`)
}
