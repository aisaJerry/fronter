const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require('./inlineManifest');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const reactLoadablePlugin = require("@loadable/webpack-plugin");

const resolve = relativePath => path.resolve(__dirname, relativePath);
const config = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        filename: '[name].[hash:10].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/dist/",
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
        // new InlineManifestWebpackPlugin({
        //     name: 'webpackManifest'
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:10].css',
            chunkFilename: '[name].[hash:5].css',
          }),
        new reactLoadablePlugin({
            filename: 'react-loadable.json',
        }),
    ],
    module: {
         rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                        babelrc: false,
                        presets: [
                            [
                            "@babel/preset-env",  // @loadable/babel-plugin处理后存在es6的语法
                            {
                                "modules": false
                            }
                            ]
                        ],
                        plugins: [
                            "@loadable/babel-plugin"
                        ]
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                        // 支持HMR和禁用类型检查，类型检查将使用ForkTsCheckerWebpackPlugin
                        transpileOnly: true  
                        }
                    }
                ],
                include: [ resolve("../src") ]
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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