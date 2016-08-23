var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var appPath = path.join(__dirname, 'src')

module.exports = {
    context: appPath,
    resolve: {
        root: appPath
    },
    entry: {
        bundle: 'main.js'
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    devServer: {
        host: 'localhost',
        port: 31313
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.(png|gif|jpg|eot|ttf|woff|woff2|svg)/,
                loader: 'file'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'eslint'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(appPath, 'index.html')
        })
    ]
}