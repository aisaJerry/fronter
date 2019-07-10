const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require('./inlineManifest');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        filename: '[name].[hash:10].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[chunkhash:5].js'
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendors: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20
                }
            }
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "index.html"
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:10].css',
            chunkFilename: '[name].[hash:5].css',
          }),
    ],
    module: {
         rules: [
            {
                test: /\.js|jsx|tsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                     MiniCssExtractPlugin.loader,
                     "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 20 versions']})];
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
         ]
     },
     resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        mainFiles: ["index"]
     }
     
}

if (process.env.npm_config_report) {
    let BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;