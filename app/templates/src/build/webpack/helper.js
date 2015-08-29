/**
 * Created by Shlomi on 07/07/2015.
 */

import webpack from 'webpack';
import path from 'path';
import CommonsChunkPlugin from 'component-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var context = path.join(process.cwd(), 'src/client');
var outputBase = path.join(process.cwd(), 'dist');
var outputPath = path.join(outputBase, 'public');

let config = {
    context: context,
    outputBase: outputBase,
    outputPath: outputPath,
    cleanPaths: [outputPath +'/js', outputPath+'/css'],
    webpack: {
        //devtool: 'eval',
        context: context,
        entry: {
            index:  './components/index/bootstrap.js',
            vendors: [
                'react/addons',
                'keymirror',
                'alt',
                'react-pure-render/function',
                'backbone',
                'immutable',
                'iso',
                'expose?$!jquery'
            ]
        },
        output: {
            path: outputPath,
            filename: 'js/[name].js',
            publicPath: '/static/js/'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'js/vendors.js',
                minChunks: Infinity
            }),
            new ExtractTextPlugin('css/[name].css', {
                allChunks: true,
                disable: false
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.styl$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
                },
                {
                    test: /\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        stage: 0
                    }
                }

            ]
        },
        progress: true,
        keepalive: true
    }
};

export default {
    getConfig(props){

        if(props.env === 'prod'){
            config.webpack.plugins.push(
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            );
        }

        return config;
    }
}
