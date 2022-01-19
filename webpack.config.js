const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillplugin = require('node-polyfill-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    output:{
        path: path.join(__dirname, 'dist'),
        publicPath:'/',
        filename: 'index_bundle.js',
        clean: true
    },

    module:{
        rules:[
            {
                test:/\.s?css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use:{
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),

        new CopyPlugin({
            patterns:[
                {from: './src/static' }
            ]
        }),
        
        new NodePolyfillplugin()
    ],

    devServer:{
        historyApiFallback: true,
        static: {directory: path.resolve(__dirname, 'dist')}
    }
}