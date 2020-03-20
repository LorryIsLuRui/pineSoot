const MiniCss = require('mini-css-extract-plugin');
const cleanPlu = require('clean-webpack-plugin').CleanWebpackPlugin;
const htmlPlu = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        index: './src/pages/index/index.tsx',
    },
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            '@': path.resolve('src'),
        }
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]', // 可提供function
                            outputPath: 'assets/',
                            limit: 39,
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCss.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
        ]
    },
    
    plugins: [new MiniCss({
        filename: 'css/[name].css',
    }), new cleanPlu({
        path: './dist'
    }), new htmlPlu({
        title: 'pine_soot',
        filename: './index.html',
        template: 'index.html',
        inject: true,
    })]
}