/**
 * Created by Shlomi on 03/07/2015.
 */

import gulp from 'gulp';
import webpack from 'webpack';
import yargs from 'yargs';

import webpackHelper from '../../webpack/helper';

let argv = yargs.argv;

export default (gulp, plugins)=>{
    return (cb) => {

        var props = {
            env: argv.env || 'dev'
        };

        let config = webpackHelper.getConfig(props);

        gulp.src(config.cleanPaths)
            .pipe(plugins.clean({force: true}))
            .on('finish', ()=>{
                // run webpack
                webpack(config.webpack, (err, stats) => {
                    if(err) throw new plugins.util.PluginError('webpack', err);
                    plugins.util.log('[webpack:build]', stats.toString({
                        colors: true,
                        //modules: true,
                        //reasons: true
                    }));

                    cb();
                });
        });
    }
}