/**
 * Created by Shlomi on 07/08/2015.
 */

import runSequence from 'run-sequence';

export function load(gulp, plugins) {
    gulp
        .task('build-client', function(callback){
            runSequence('stylus', 'copy-static-files', 'webpack', callback);
        })
        .task('build-server', function(callback){
            runSequence('config', callback);
        })
        .task('build-all', function(callback){
            runSequence('create-folders', 'babel', 'build-server', 'build-client', callback);
        })
        .task('dev', function(callback){
            runSequence('build-all', 'watch', callback);
        })
        .task('default', ['dev'])

}
