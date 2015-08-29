/**
 * Created by Shlomi on 28/06/2015.
 */

import yargs from 'yargs';

let argv = yargs.argv;

export default (gulp, plugins) => {
    return () => {

        var props = {
            env: argv.env || 'dev'
        };

        return gulp.src(['./assets/config/base.json', './assets/config/' + props.env +'.json'])
            .pipe(plugins.extend('./config.json', true, '\t'))
            .pipe(gulp.dest('./'));
    };
};