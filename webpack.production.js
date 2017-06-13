var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var argv = require('minimist')(process.argv.slice(2))

var profiles = {
    prod: {
        url: 'https://leha-plant-demo.herokuapp.com/',
        template: 'index.html',
    },
    staging: {
        url: 'https://leha-plant-demo.herokuapp.com/',
        template: 'index.html',
    },
    local: {
        url: 'https://leha-plant-demo.herokuapp.com/',
        template: 'index.html',
    }
}

var profileName = argv.profile
console.log('Webpack start build. profile: ' + profileName)
var profile = profiles[profileName]

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: './src/index.js',
        vendor: ['moment', 'react', 'react-bootstrap-slider', 'react-dom', 'react-redux', 'react-router',
            'react-router-redux', 'redux', 'redux-form', 'redux-thunk']
    },
    output: {
        path: __dirname + '/static/',
        publicPath: '/static/',
        filename: '[name]-[hash].js',
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production'),
            API_URL: JSON.stringify(profile.url),
            TINKOFF_TERMINAL_KEY: JSON.stringify(profile.tinkoffTerminalKey),
        }),
        new HtmlWebpackPlugin({
            template: profile.template,
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: true,
                drop_console: true,
                unsafe: true
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor-[hash].js"),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(jpg|png|ico)$/,
                loader: 'file?name=img/[name].[ext]'
            },
            {
                test: /.*font.*\.(otf|eot|svg|ttf|woff|woff2)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
}