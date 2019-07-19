const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const SSRServerPlugin = require("../plugin/webpack/server-plugin");

const config = {
    target: 'node',
    entry: {
        app: path.resolve(__dirname, '../src/server-index.tsx')
    },
    output: {
        filename: 'ssr.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/dist/",
        libraryTarget: 'commonjs2',
    },
    externals: [
        nodeExternals({
          whitelist: [ /\.css$/ ]  // 忽略css，让webpack处理
        })
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
                      plugins: [
                        "dynamic-import-node",
                        "@loadable/babel-plugin"
                      ]
                    }
                  },
                  {
                    loader: "ts-loader",
                    options: {
                      transpileOnly: true  // 只进行编译
                    }
                  }
                ],
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
         ]
     },
     plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:10].css',
            chunkFilename: '[name].[hash:5].css',
        }),
        new SSRServerPlugin({
            filename: "server-bundle.json"
        })
    ],
     resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
     }
     
}

module.exports = config;