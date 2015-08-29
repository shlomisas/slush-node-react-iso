/**
 * Created by Shlomi on 18/08/2015.
 */

import multer from 'multer';
import mime from 'mime-types';
import MD5 from 'MD5';

import BaseHelper from './base';
import GeneralHelper from './general';
import logger from '../utils/logger';

var locked = true;
export default class MulterHelper extends BaseHelper {
    constructor(dest) {
        if(locked){
            throw new Error('Cannot initiate singleton..');
        }

        super();

        var storage = multer.diskStorage({
            destination: dest,
            filename: function (req, file, cb) {
                let ext = mime.extension(file.mimetype);
                cb(null, MD5(new Date().getTime()+file.originalname) + '.' + ext);
            }
        });

        this._upload = multer({storage: storage});
    }

    get upload(){
        return this._upload;
    }

    getArrayMw(alias){
        return this._upload.array(alias);
    }

    getSingleFileMw(alias = ''){
        return this._upload.single(alias);
    }

    static getInstance(dest = GeneralHelper.getTempUploadFolder()){
        if(!this._instance){
            locked = false;
            this._instance = new MulterHelper(dest);
            locked = true;
        }
        return this._instance;
    }
}
