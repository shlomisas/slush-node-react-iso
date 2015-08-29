/**
 * Created by Shlomi on 02/07/2015.
 */


import mongoose from 'mongoose';

import config from '../config';
import BaseHelper from './base';
import GeneralHelper from './general';

// For singleton purposes
var locked = true;

export default class MongoHelper extends BaseHelper{

    constructor(){
        if(locked) throw new Error('Cannot initiate singleton');

        super();
        this.connections = {};
        this.connect();
    }

    connect(dbName = config.get('mongodb:local:db')){
        return new Promise((resolve, reject) => {

            // Return cached connection
            if(this.connections[dbName]){
                return resolve(this.connections[dbName]);
            }

            var path = this.constructor.getMongoConnectionString();

            this.connections[dbName] = mongoose.createConnection(path, {
                server:{
                    auto_reconnect:true
                }
            });

            this.connections[dbName].on('error', (err) => {
                reject(err);
            });

            this.connections[dbName].once('open', () => {
                GeneralHelper.info('MongoDB has connected to ' + dbName);
                resolve(this.connections[dbName]);
            });
        });
    }

    getConnection(dbName = config.get('mongodb:local:db')){
        if(!this.connections[dbName]){
            throw new Error('MongoDB connection for #' + dbName + ' DB is not exist, please connect first');
        }
        return this.connections[dbName];
    }

    static getMongoConnectionString(){
        var mongodbSettings = config.get('mongodb:local');
        return 'mongodb://' + mongodbSettings.username +
            ':' + mongodbSettings.password +
            '@' + mongodbSettings.host +
            ':' + mongodbSettings.port + '/' +
            mongodbSettings.db;
    }

    static getInstance(){
        if(!this.instance){
            locked = false;
            this.instance = new this();
            locked = true;
        }
        return this.instance;
    }

    static getObjectIdObject(strOBjId){
        return new mongoose.Types.ObjectId(strOBjId);
    }
}