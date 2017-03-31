
var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var compiler = webpack(config);

config.entry.main.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");


new webpackDevServer(compiler, {

    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,

    historyApiFallback: false,

    proxy: {
        '/cgi/*': {
            target: 'http://127.0.0.1:4000',
            secure: false
        }
    },

    stats: {
        colors: true
    }

}).listen(8080);