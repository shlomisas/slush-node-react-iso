/**
 * Created by Shlomi on 29/06/2015.
 */

import BaseHelper from './base';
import config from '../config';
import logger from '../utils/logger';

var getError = function(message, code){

    if(message instanceof Error){
        message = message.message;
    }

    var error = new Error(message || 'Error');
    error.status = code || 400;
    return error;
};

export default class HttpHelper extends BaseHelper {

    static get400(message = 'Error') {
        return getError(message, 400);
    }

    static get409(message = 'Duplicate Resource') {
        return getError(message, 409);
    }

    static get401(message = 'Unauthorized') {
        return getError(message, 401);
    }

    static get404(message = 'Not Found') {
        return getError(message, 404);
    }

    static getInvalidInputError(message = 'Invalid Input'){
        return this.get400(message);
    }

    static send200(res, data){
        return res.status(200).json(data);
    }

    static isAjaxRequest(req){
        return req.xhr;
    }

    static isAdmin(req){
        return req.session.isAdmin;
    }

    static ensureAdmin(){
        return (req, res, next)=>{
            if(!this.isAdmin(req)){
                return next(this.get401('You required to be Admin :)'));
            }
            next();
        }
    }

    static getRequestIP(req){
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
}