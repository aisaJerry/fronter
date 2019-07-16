const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    target: 'node',
    entry: {
        app: path.resolve(__dirname, '../src/app.tsx')
    },
    externals: [nodeExternals()],
    output: {
        filename: 'ssr.js',
        path: path.resolve(__dirname, '../distSSR'),
        // chunkFilename: '[name].[chunkhash:5].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "index.html"
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

module.exports = config;