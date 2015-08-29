/**
 * Created by Shlomi on 28/06/2015.
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');

// Local helper for paths
var paths = {
    src: './src',
    dest: './dist',
    gulp: {
        base: './dist/build/gulp',
        tasks: './dist/build/gulp/tasks'
    }
};

// Inline tasks - must be here cause BABEL doesn't made is work yet
gulp
    .task('clean-dist', function () {
        return gulp
            .src(paths.dest)
            .pipe(plugins.clean({ force: true }));
    })
    .task('babel', function(){
        gulp
            .src(path.join(paths.src, '**/*.js'))
            //.pipe(plugins.sourcemaps.init())
            // Re-used code - but thanks for the damn ES5/6 hybrid mode it's not trivial to fix that. bye.
            .pipe(plugins.babel({
                stage: 0
            }))
            //.pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.dest));
    })
    .task('init', function(callback){
        runSequence('clean-dist', 'babel', callback);
    });

// For case ./dist folder is empty cause not generated yet by babel.. (BTW, in this case run `gulp init` first)
try{
    // Load all tasks
    fs
        .readdirSync(paths.gulp.tasks)
        .forEach(function(filename) {
            var file = path.join(paths.gulp.tasks, filename);
            var stat = fs.statSync(file);

            if (stat.isFile() && filename.slice(-3) !== '.js') {
                return;
            }

            var name = filename.slice(0, -3);
            var task = require(paths.gulp.tasks +'/'+ filename)(gulp, plugins);

            // Register the task
            gulp.task(name, task);
        });
    // Load Aliases
    require(paths.gulp.base +'/'+'aliases.js').load(gulp);
}catch(e){
    console.log(e);
    //throw e;
}
