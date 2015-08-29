/**
 * Created by Shlomi on 29/06/2015.
 */

import path from 'path';

import BaseHelper from './base';
import config from '../config';
import logger from '../utils/logger';

const uploadsTempFolder = path.join(process.cwd(), '..', '..', 'assets', 'uploads', 'tmp');
const uploadsFinalFolder = path.join(process.cwd(), '..', '..', 'assets', 'uploads', 'real');

class GeneralHelper extends BaseHelper {

    static getEnv(){
        return config.get('env:name');
    }

    static is(env) {
        return this.getEnv() === env;
    }

    static isProd() {
        return this.is('prod');
    }

    static isDev() {
        return this.is('dev');
    }

    static getLoggerFormat() {
        return this.isDev() ? 'dev' : 'dev';
    }

    // Logging
    static info(msg) {
        logger.info(msg);
    }

    static debug(msg) {
        logger.debug(msg);
    }

    static error(msg) {
        logger.error(msg);
    }

    static getTempUploadFolder(){
        return uploadsTempFolder;
    }

    static getWebsiteImagesFolder(){
        return path.join(uploadsFinalFolder, 'website');
    }
}

logger.level = GeneralHelper.isProd() ? 'debug' : 'debug';

export default GeneralHelper;