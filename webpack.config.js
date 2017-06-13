const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development'),
            API_URL: JSON.stringify('https://leha-plant-demo.herokuapp.com/'),
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname,
            },
            {
                test: /\.(jpg|png|ico)$/,
                loader: 'file?name=img/[name].[ext]',
            },
            {
                test: /\.css$/,
                loader: 'style!css',
            },
            {
                test: /\.less$/,
                loader: "style!css!less",
            },
        ],
    },
}
