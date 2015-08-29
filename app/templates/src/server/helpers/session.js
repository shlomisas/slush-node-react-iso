/**
 * Created by Shlomi on 29/06/2015.
 */

import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import timeunit from 'timeunit';

import config from '../config';
import BaseHelper from './base';
import GeneralHelper from './general';

export default class SessionHelper extends BaseHelper{
    static getStorage(){
        return new Promise((resolve, reject) => {

            GeneralHelper.info('Getting session storage');

            var RedisStore = connectRedis(expressSession);

            resolve(new RedisStore({
                host: config.get('redis:host'),
                port: config.get('redis:port'),
                prefix: config.get('redis:sessions:prefix'),
                db: config.get('redis:databases:sessions'),
                ttl: this.getSessionTTL()
            }));
        });
    }

    static getSessionTTL(){
        return timeunit.days.toSeconds(30);
    }
}