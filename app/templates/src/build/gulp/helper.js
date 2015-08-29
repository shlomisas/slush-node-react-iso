/**
 * Created by Shlomi on 07/08/2015.
 */

import babel from 'gulp-babel';
import stylus from 'gulp-stylus';
import nib from 'nib';

export default {
    getBabelPipe(){
        return babel({
            stage: 0
        })
    },
    getStylusPipe(){
        return stylus({
            use: [nib()],
            import: [
                'nib'
            ],
            style: 'compressed'
        })
    }
}