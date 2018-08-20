const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const backendConfiguration = {
    target: 'node',
    //  mode: 'production',
    // target: "webworker", // WebWorker
    // target: "node", // Node.js via require
    // target: "async-node", // Node.js via fs and vm
    // target: "node-webkit", // nw.js
    // target: "electron-main", // electron, main process
    // target: "electron-renderer", // electron, renderer process
    devtool: 'source-map',
    resolve: {
        // Add `.ts` as a resolvable extension.
        extensions: ['.ts']
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000, // refresh and watch every second
        ignored: /node_modules/
    },
    entry: {
        'backend/server': './src/backend/server.ts'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // .tsx and .ts rules
            {
                test: /\.(ts)$/,
                include: [
                    path.resolve(__dirname, 'src/backend')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules' || 'public/bower_components')
                ],
                use: [
                    'cache-loader',
                    'tslint-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true // either happyPackMode or transpileOnly. One at a time
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // Webpack plugin that runs typescript type checker on a separate process
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        // A webpack plugin to remove/clean your build folder(s) before building
        new CleanWebpackPlugin(['dist/backend/'], {
            // options
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

const frontendConfiguration = {
    target: 'web',
    // target: "webworker", // WebWorker
    // target: "node", // Node.js via require
    // target: "async-node", // Node.js via fs and vm
    // target: "node-webkit", // nw.js
    // target: "electron-main", // electron, main process
    // target: "electron-renderer", // electron, renderer process
    // mode: 'production',
    devtool: 'source-map',
    resolve: {
        // Add `.ts`, `.tsx`, '.js' and '.es6' as a resolvable extension.
        extensions: ['.tsx', '.ts', '.jsx', '.es6', '.js', '.json']
    },
    // watch: true, // Watch the filesystem for changes
    watchOptions: { // The polling interval for watching (also enable polling)
        aggregateTimeout: 300,
        poll: 1000, // refresh and watch every second
        ignored: [/node_modules/, /bower_components/]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // contentBase: './dist',
        clientLogLevel: 'none',
        compress: true,
        // historyApiFallback: true,
        // watchContentBase: true,
        watchOptions: {
            poll: true
        },
        // hot: true,
        // host: '0.0.0.0',
        // port: 9000, // specify a port number
        index: 'index.html',
        //  overlay: true, // show full screen compiler errors,
        // quiet: true, // nothing except the initial startup information will be written to the console...no errors or warnings from webpack are visible 
        // socket: 'socket' // The Unix socket to listen to (instead of a host)
    },
    entry: {
        'frontend/index': './src/frontend/index.tsx'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // .tsx and .ts rules
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, 'src/frontend')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules' || 'public/bower_components')
                ],
                use: [
                    'cache-loader',
                    'tslint-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true // either happyPackMode or transpileOnly. One at a time
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        // Webpack plugin that runs typescript type checker on a separate process
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        // A webpack plugin to remove/clean your build folder(s) before building
        new CleanWebpackPlugin(['dist/frontend/'], {
            // options
            verbose: true,
            dry: false
        }),
        /** HMR allows all kinds of modules to be updated at runtime without the need for a full refresh.
         ** HMR is not intended for use in production.
         */
        new webpack.HotModuleReplacementPlugin({
            // Options...
            title: 'Dev: Hot Module Replacement...'
        }),
        // The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. 
        new HtmlWebpackPlugin({
            title: 'development',
            filename: 'index.html',
            template: './public/views/index.html'
        })
    ]
};

// export
module.exports = [backendConfiguration, frontendConfiguration];
