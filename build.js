import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
import { sassPlugin } from 'esbuild-sass-plugin'

const production = process.env.NODE_ENV === 'production'
const serve = process.env.ESBUILD_SERVE === '1'

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: production,
    // minify: production,
    outdir: 'dist',
    metafile: true,
    splitting: true,
    format: 'esm',
    target: ['chrome100', 'firefox100'],
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
                    // inline: { js: true }
                }
            ]
        }),
        sassPlugin({})
    ]
})

if (serve) {
    const { port, host } = await ctx.serve({ servedir: 'dist' })
    console.log(`Serving on ${host}:${port}`)
}
