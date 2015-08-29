/**
 * Created by Shlomi on 07/08/2015.
 */

import path from 'path';

let paths = {
    base: {
        src: './src',
        dest: './dist'
    },
    stylus: {
        get src(){
            return path.join(paths.base.src, 'client/stylus/**/*.styl');
        },
        get dest(){
            return path.join(paths.base.dest, 'client/css');
        }
    },
    babel: {
        get src(){
            return path.join(paths.base.src, '**/*.js');
        },
        get dest(){
            return paths.base.dest;
        }
    },
    webpack: {
        get src(){
            return [
                path.join(paths.base.src, 'client/**/*')
            ];
        }
    },
    staticFilesToCopy: {
        get src(){
            return [
                path.join(paths.base.src, '**/*'),
                '!'+path.join(paths.base.src, 'client/stylus'),
                '!'+path.join(paths.base.src, '**/*.styl'),
                '!'+path.join(paths.base.src, '**/*.js')
            ]
        }
    }
};

export default paths;
