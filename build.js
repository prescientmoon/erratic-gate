import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
import { sassPlugin } from 'esbuild-sass-plugin'
import * as fs from 'fs'

const serve = process.env.ESBUILD_SERVE === '1'

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    minify: !serve,
    bundle: true,
    metafile: true,
    splitting: true,
    outdir: 'dist',
    format: 'esm',
    target: ['es2020'],
    assetNames: 'assets/[name]-[hash]',
    loader: {
        '.svg': 'file'
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
    ]
})

if (serve) {
    const { port, host } = await ctx.serve({ servedir: 'dist' })
    console.log(`Serving on ${host}:${port}`)
} else {
    await ctx.rebuild()
    await ctx.dispose()
    fs.cpSync('./dist/index.html', './dist/404.html') // Needed to please github pages
}
