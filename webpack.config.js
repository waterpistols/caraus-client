var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './client'
    ],
    output: {
        path:     path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: path.join(__dirname, 'dist')
    },
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions:         ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test:    /\.js?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.scss$/,
                loader: "css-loader!sass-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:' + (process.env.PORT || 3000)
        },
        host: 'localhost'
    }
};