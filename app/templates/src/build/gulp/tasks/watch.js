/**
 * Created by Shlomi on 07/08/2015.
 */

import gulpHelper from '../helper';
import paths from '../paths';

import fs from 'fs';

export default (gulp, plugins)=>{
    return ()=>{

        // For babel
        gulp
            .src(paths.babel.src)
            .pipe(plugins.watch(paths.babel.src, {verbose: true}))
            //.pipe(plugins.sourcemaps.init())
            .pipe(gulpHelper.getBabelPipe())
            //.pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.babel.dest));

        // For stylus
        gulp
            .src(paths.stylus.src)
            .pipe(plugins.watch(paths.stylus.src, {verbose: true}))
            .pipe(gulpHelper.getStylusPipe())
            .pipe(gulp.dest(paths.stylus.dest));

        // For webpack
        plugins.watch(paths.webpack.src, plugins.batch(function (events, done) {
            gulp.start('webpack', done);
        }));

        // For static files
        gulp
            .src(paths.staticFilesToCopy.src, {buffer: false})
            .pipe(plugins.watch(paths.staticFilesToCopy.src, {verbose: true}))
            .pipe(gulp.dest(paths.base.dest));

        // For server changes
        //plugins.nodemon({
        //    cwd: './dist/server',
        //    script: 'app.js',
        //    //ext: 'js',
        //    tasks: ['build-server'],
        //    env: { 'NODE_ENV': 'development' },
        //    watch: '../../src/**/*.js'
        //})
    }

}

