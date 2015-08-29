/**
 * Created by Shlomi on 05/07/2015.
 */

import gulpHelper from '../helper';
import paths from '../paths';

export default (gulp, plugins)=>{
    return ()=>{
        return gulp.src(paths.stylus.src)
            .pipe(gulpHelper.getStylusPipe())
            .pipe(gulp.dest(paths.stylus.dest));
    }
}
