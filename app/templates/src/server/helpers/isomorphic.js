/**
 * Created by Shlomi on 03/07/2015.
 */

import BaseHelper from './base';
import GeneralHelper from './general';

export default class IsomorphicHelper extends BaseHelper{

    constructor(){
        super();

        this._baseCssPath = './public/css';
        this._cssFiles = [];
        this._isProd = GeneralHelper.isProd()
    }

    get cssFiles(){
        return this._cssFiles;
    }

    addCssFile(path, rel = true){
        this._cssFiles.push(this._baseCssPath.concat(path));
    }

    get isProd(){
        return this._isProd;
    }

    static isServer(){
        return typeof window === 'undefined';
    }

    static isClient(){
        return !this.isServer();
    }
}