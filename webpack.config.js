/* eslint-env node */

var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

var libraryName = 'Library';

var plugins = [],
    outputFile;

var mode = require('yargs').argv.mode;
if (mode === 'min') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile.toLowerCase(),
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;
