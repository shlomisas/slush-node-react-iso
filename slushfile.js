/**
 * Created by Shlomi on 28/08/2015.
 */

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    inquirer = require('inquirer');

var questions = require('./questions/all');

gulp.task('default', function (done) {
    inquirer.prompt(questions,
        function (answers) {
            gulp.src(__dirname + '/app/templates/**') // Relative to __dirname
                .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./')) // Relative to cwd
                .pipe(install())
                .on('finish', function () {
                    done(); // Finished!
                });
        });
});
