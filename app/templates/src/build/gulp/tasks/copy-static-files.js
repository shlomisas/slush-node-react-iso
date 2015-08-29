/**
 * Created by Shlomi on 05/07/2015.
 */

import mkdirp from 'mkdirp';
import paths from '../paths';

export default (gulp, plugins)=>{
    return ()=>{
        gulp.src(paths.staticFilesToCopy.src)
            .pipe(gulp.dest(paths.base.dest));
    }
}