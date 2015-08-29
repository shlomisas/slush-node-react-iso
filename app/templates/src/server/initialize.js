/**
 * Created by Shlomi on 29/06/2015.
 */

import express from 'express';
import path from 'path';
import useragent from 'useragent';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import nodeJsx from 'node-jsx';
import expressHbs from 'express-handlebars';

import config from './config';

import GeneralHelper from './helpers/general';
import SessionHelper from './helpers/session';
import MongoHelper from './helpers/mongo';
import IsomorphicHelper from './helpers/isomorphic';
import HttpHelper from './helpers/http';

import publicRouter from './routers/public';

var middlwares = {
    preDB(app){
        return new Promise((resolve) => {

            GeneralHelper.info('Define preDB middlewares');

            // health check
            app.use('/health-check', (req, res) => {
                res.send('OK');
            });

            app.use((req, res, next) => {
                res.header('X-Powered-By', config.get('project:projectName') + ' IT');
                next();
            });

            // For static files
            app.use('/static/uploads', express.static(path.join('..', '..', 'assets', 'uploads', 'real')));
            app.use('/static', express.static(path.join('..', 'public')));

            // Check user-agent compatibility
            //app.use((req, res, next) => {
            //    var agent = useragent.parse(req.headers['user-agent']);
            //
            //    if(GeneralHelper.isProd()) {
            //        if(((agent.family === 'Opera' && agent.major < 20) ||
            //            (agent.family === 'IE' && agent.major < 10)) &&
            //            (req.url !== '/notSupported' && req.url.indexOf('/static') === -1)){
            //
            //            return res.redirect('/notSupported');
            //        }
            //    }
            //
            //    next();
            //});

            // Middleware to add Isomorphic support
            app.use((req, res, next) => {
                let isomorphicHelper = new IsomorphicHelper();
                isomorphicHelper.addCssFile('general.css');

                res.isomorphicHelper = isomorphicHelper;

                // Proxy render function
                var old = res.render;
                res.render = function(filePath, options = {}){
                    options.isomorphicHelper = res.isomorphicHelper;
                    old.call(this, filePath, options);
                };

                next();
            });

            // Vendor middlewares
            app.use(morgan(GeneralHelper.getLoggerFormat()));
            app.use(compression());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(cookieParser());

            // ### View engine
            app.set('views', path.join(__dirname, 'views'));

            // Set handlebars as view engine
            app.engine('.hbs', expressHbs.create({
                defaultLayout: 'main',
                extname: 'hbs',
                helpers: {
                    escape: function(variable){
                        return variable.replace(/(['"])/g, '\\$1');
                    }
                }
            }).engine);

            app.set('view engine', '.hbs');

            resolve();
        });
    },
    postDB(app, store){

        GeneralHelper.info('Define postDB middlewares');

        return new Promise((resolve) => {
            // Add session storage
            app.use(expressSession({
                name: config.get('redis:sessions:cookie:name'),
                secret: config.get('redis:sessions:secret'),
                store: store,
                cookie: {
                    domain: config.get('redis:sessions:cookie:domain'),
                    maxAge: SessionHelper.getSessionTTL() * 1000
                },
                resave: true,
                saveUninitialized: true
            }));

            // ##### Add auth module
            app.use(passport.initialize());
            app.use(passport.session());

            //Define local auth strategy
            //var LocalStrategy = require('passport-local').Strategy;
            //passport.use(new LocalStrategy({
            //    usernameField: 'email',
            //    passwordField: 'password'
            //}, userHelper.login));
            //
            //var FacebookStrategy = require('./utils/facebookStrategy').Strategy;
            //passport.use(new FacebookStrategy({
            //    appId: config.get('social:facebook:appId'),
            //    appSecret: config.get('social:facebook:appSecret')
            //}, userHelper.fbLogin.bind(userHelper)));
            //
            //passport.serializeUser(userHelper.serializeUser);
            //passport.deserializeUser(userHelper.deserializeUser);

            resolve();
        });
    },
    routers(app){

        GeneralHelper.info('Define routers');

        return new Promise((resolve) => {
            app.use('/', publicRouter);
            resolve();
        });
    },
    finalize(app){

        GeneralHelper.info('Finalize middlewares');

        return new Promise((resolve) => {
            // Not found middleware
            app.use('*', (req, res, next) => {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });

            app.use((err, req, res, next) => {

                if(typeof err === 'string'){
                    err = new Error(err);
                }

                if(err.msg){
                    err.message = err.msg;
                }

                if(err.errorCode){
                    err.status = err.errorCode;
                }

                res.status(err.status || 400);

                var params = {
                    error: err.message,
                    status: err.status
                };

                if(GeneralHelper.isDev()){
                    params.stack = err.stack;
                }

                if(HttpHelper.isAjaxRequest(req)){
                    res.json(params);
                }else{
                    res.render('errors/general', {
                        error: err,
                        layout: 'error',
                        isDev: GeneralHelper.isDev()
                    });
                }
            });

            resolve();
        });
    }
};

var utils = {
    addJSXTranspiler: function(){
        // Make sure to include the JSX transpiler so NOde can require JSX files
        nodeJsx.install();
    },
    // Promisify libraries are promise-unaware API to become promise-returning API
    promisify: function() {
        return new Promise((resolve) => {

            var promisifyOptions = {suffix: 'P'};

            // Promisify mongoose
            bluebird.promisifyAll(mongoose, promisifyOptions);

            resolve();
        });
    }
};

// ### Public
export default function(app){

    utils.addJSXTranspiler();

    return utils.promisify().then(()=>{
        return MongoHelper.getInstance().connect();
    }).then(() => {
        return middlwares.preDB(app);
    }).then(() => {
        return SessionHelper.getStorage();
    }).then((store) => {
        return middlwares.postDB(app, store);
    }).then(() => {
        return middlwares.routers(app);
    }).then(() => {
        return middlwares.finalize(app);
    });
}
