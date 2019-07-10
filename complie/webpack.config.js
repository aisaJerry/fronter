const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require('webpack-inline-manifest-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: './src/index.tsx',
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
                },
                styles: {
                    name: 'app',
                    test: /\.css|.scss$/,
                    chunks: 'all',
                    enforce: true,
                  },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "index.html",
            excludeChunks: ['manifest'] 
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest',
            deleteFile: true
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
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
                     "css-loader", // translates CSS into CommonJS modules
                    {
                        loader: "postcss-loader", // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [autoprefixer({browsers: ['last 20 versions']})];
                            }
                        }
                    },
                    "sass-loader" // compiles Sass to CSS
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
         ]
     },
     resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
     }
     
}

if (process.env.npm_config_report) {
    let BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;