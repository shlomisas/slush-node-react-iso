/**
 * Created by Shlomi on 07/08/2015.
 */

import mkdirp from 'mkdirp';

export default (gulp, plugins)=>{
    return ()=>{
        mkdirp('./logs');
    }
}
