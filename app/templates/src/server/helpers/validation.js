/**
 * Created by Shlomi on 21/08/2015.
 */

import BaseHelper from './base';

export default class ValidationHelper extends BaseHelper {
    static isEmail(email){
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
    }
}