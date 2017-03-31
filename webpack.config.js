var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var isProd = process.argv[2].indexOf('dist') !== -1;

var hash = isProd ? '-[hash:8]' : '';
var dir = isProd ? '/dist' : '/dev';

var getFileName = function (name) {
    return name.replace('-$hash', hash);
};

var htmlminConf = {
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    //collapseBooleanAttributes: true,
    //removeAttributeQuotes: true,
    //removeRedundantAttributes: true,
    useShortDoctype: true,
    //removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeComments: true,
    // minifyJS: true,
    // minifyCSS: true
};

var conf = {
    devtool: isProd ? false : '#inline-source-map',
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js', '.jsx'],
        alias: {
            ueditor: path.resolve('./src/lib/ueditor.all'),
            codemirror: path.resolve('node_modules/codemirror'),
            project: path.resolve('./src'),
            actions: path.resolve('./src/actions'),
            common: path.resolve('./src/common'),
            constants: path.resolve('./src/constants'),
            containers: path.resolve('./src/containers'),
            middlewares: path.resolve('./src/middlewares'),
            reducers: path.resolve('./src/reducers'),
            services: path.resolve('./src/services'),
            store: path.resolve('./src/store'),
            util: path.resolve('./src/util'),
            img: path.resolve('./src/common/img'),
            style: path.resolve('./src/common/style'),
        }
    },
    entry: {
        main: ['project/app.jsx'],
        // bug https://github.com/webpack/webpack/issues/932. 不会加载article.jsx中引用的less
        /*index: ['containers/Index.jsx'],
        article: ['containers/Article.jsx'],
        tag: ['containers/Tag.jsx']*/
    },

    output: {
        path: __dirname + dir,
        publicPath: isProd ? '/mgr/' : '/',
        filename: getFileName('js/[name]-$hash.js'),
        chunkFilename: getFileName('js/[name]-$hash.js')
        // chunkFilename: '[chunkhash].chunk.js' or chunkFilename: '[id].[hash].chunk.js' instead
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react']
                }
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: isProd ? 'url-loader?limit=8192&name=img/[hash:8].[ext]' :'url-loader?limit=8192&name=img/[name].[ext]'
            },
            {
                test: /\.(eot|woff2|ttf|woff)$/,
                loader: 'file?name=css/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            minChunks: 2
        }),

        new webpack.ProvidePlugin({
            React: 'react'
        }),

        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),

        new ExtractTextPlugin(getFileName('css/[name]-$hash.css')),

        new webpack.HotModuleReplacementPlugin(),

        isProd ? new HtmlWebpackPlugin({
            filename: (__dirname + dir + '/index.html'),
            template: __dirname + '/src/index.html',
            chunks: ['vender', 'main'],
            inject: true,
            minify:htmlminConf
        }): new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            chunks: ['vender', 'main'],
            inject: true
        })
    ]
};

if (isProd) {
    conf.plugins.push(
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist'), {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false
        }),

        // 发布时，使用react线上版
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = conf;
