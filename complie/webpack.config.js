const path = require('path');
const webpack  = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestWebpackPlugin = require('webpack-inline-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20
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
        // 抽离css
        new ExtractTextPlugin('[name].[hash:10].css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({browsers: ['last 20 versions']})]
            }
        })
    ],
    module: {
         rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
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