/**
 * Created by Shlomi on 29/06/2015.
 */

import winston from 'winston';
import path from 'path';

var logsDir = path.join(process.cwd(), '..', '..', 'logs');
var consoleProps = {
    prettyPrint: true,
    colorize: true
};

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(consoleProps),
        new (winston.transports.File)({ filename: logsDir + '/general.log' })
    ]
});

export default logger;