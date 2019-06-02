const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|mp3|wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'style.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    },
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader?name=./res/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin(
            {
                filename: 'style.css',
                allChunks: true
            }
        )
    ],
    resolve: {
        extensions: [
            ".js",
            ".ts"
        ]
    },
    entry: [
        "./src/index.ts"
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    }
};
