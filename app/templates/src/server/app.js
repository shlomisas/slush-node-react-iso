/**
 * Created by Shlomi on 27/06/2015.
 */

import 'babel/polyfill';

import express from 'express';
import http from 'http';

import config from './config';
import GeneralHelper from './helpers/general';
import initialize from './initialize';

const app = express();
app.set('env', config.get('env:name'));

var httpServer = http.createServer(app);

// Initialize all - middlewares, routers etc.
initialize(app).then(() => {
    // Start the HTTP server
    httpServer.listen(config.get('http:port'), function(){
        GeneralHelper.info('HTTP Server started at port ' + httpServer.address().port);
    });
}).catch((err) => {
    GeneralHelper.error(err);
});