/**
 * Created by Shlomi on 28/08/2015.
 */

var validator = {
    require: function(input){
        return !!input;
    },
    validAppId: function(input){
        return /^[a-zA-Z0-9]+$/i.test(input);
    }
};

module.exports = [
    // General
    {type: 'input', name: 'appName', message: 'Enter app name', validate: validator.require},
    {type: 'input', name: 'appId', message: 'Enter app ID (a-z|A-Z|0-9)', validate: function(input){
        return validator.require(input) && validator.validAppId(input);
    }},
    {type: 'input', name: 'appAuthor', message: 'Enter app author'},

    // Package JSON
    {type: 'input', name: 'appPackageJsonName', message: 'Enter package.json name field (a-z|A-Z|0-9)', validate: validator.require, default: function(answers){
        return answers.appId;
    }},
    {type: 'input', name: 'appPackageJsonDescription', message: 'Enter package.json description field'},
    {type: 'input', name: 'appPackageJsonRepoType', message: 'Enter package.json repository:type field'},
    {type: 'input', name: 'appPackageJsonRepoURL', message: 'Enter package.json repository:url field'},
    {type: 'input', name: 'appPackageJsonAuthor', message: 'Enter package.json author field', validate: validator.require, default: function(answers){
        return answers.appAuthor;
    }},

    // Config
    {type: 'input', name: 'appRootDomain', message: 'Enter app root domain', validate: validator.require},
    {type: 'input', name: 'appHeadDescription', message: 'Enter app HTML head description'},
    {type: 'input', name: 'appHeadKeywords', message: 'Enter app HTML head keywords'},

    {type: 'input', name: 'appPortsNginxProd', message: 'Enter app nginx port (prod)', default: '80'},
    {type: 'input', name: 'appPortsNginxDev', message: 'Enter app nginx port (dev)', default: '8080'},

    {type: 'input', name: 'appPortsHttpProd', message: 'Enter app http port (prod)', validate: validator.require},
    {type: 'input', name: 'appPortsHttpDev', message: 'Enter app http port (dev)', validate: validator.require},

    {type: 'input', name: 'appProdDomain', message: 'Enter app prod domain', default: function(answers){
        return 'www.'.concat(answers.appRootDomain);
    }},
    {type: 'input', name: 'appDevDomain', message: 'Enter app dev domain', default: function(answers){
        return 'dev.'+answers.appRootDomain;
    }},

    {type: 'input', name: 'appProdNginxDomain', message: 'Enter app nginx prod domain', default: function(answers){
        return answers.appRootDomain.concat(' ').concat(answers.appProdDomain);
    }},
    {type: 'input', name: 'appDevNginxDomain', message: 'Enter app nginx dev domain', default: function(answers){
        return answers.appDevDomain;
    }},

    {type: 'input', name: 'appRedisSessionPrefix', message: 'Enter Redis session prefix', validate: validator.require, default: 'sess'},
    {type: 'input', name: 'appRedisSessionSecret', message: 'Enter Redis session secret', validate: validator.require, default: function(answers){
        return answers.appId.concat(Math.random().toString(36).slice(2));
    }},
    {type: 'input', name: 'appRedisSessionCookieName', message: 'Enter Redis session cookie name', default: 'sid'},
    {type: 'input', name: 'appRedisSessionCookieDomain', message: 'Enter Redis session cookie domain', default: function(answers){
        return answers.appRootDomain
    }},

    {type: 'input', name: 'appCookiePrefixProd', message: 'Enter app cookie prefix (prod)', default: function(answers){
        return answers.appId;
    }},
    {type: 'input', name: 'appCookiePrefixDev', message: 'Enter app cookie prefix (dev)', default: function(answers){
        return answers.appId.concat('dev');
    }},

    // Mongo
    {type: 'input', name: 'appMongoHostProd', message: 'Enter app MongoDB host (prod)', validate: validator.require, default: function(answers){
        return 'mongo.'.concat(answers.appRootDomain);
    }},
    {type: 'input', name: 'appMongoHostDev', message: 'Enter app MongoDB host (dev)', validate: validator.require, default: function(answers){
        return 'dev-'.concat(answers.appMongoHostProd);
    }},

    {type: 'input', name: 'appMongoPortProd', message: 'Enter app MongoDB post (prod)', validate: validator.require, default: 27017},
    {type: 'input', name: 'appMongoPortDev', message: 'Enter app MongoDB post (dev)', validate: validator.require, default: 27017},

    {type: 'input', name: 'appMongoUsernameProd', message: 'Enter app MongoDB username (prod)', validate: validator.require, default: function(answers){
        return answers.appId.concat('RwUser');
    }},
    {type: 'input', name: 'appMongoUsernameDev', message: 'Enter app MongoDB username (dev)', validate: validator.require, default: 'root'},

    {type: 'input', name: 'appMongoPasswordProd', message: 'Enter app MongoDB password (prod)', validate: validator.require},
    {type: 'input', name: 'appMongoPasswordDev', message: 'Enter app MongoDB password (dev)'},

    {type: 'input', name: 'appMongoDbNameProd', message: 'Enter app MongoDB database name (prod)', validate: validator.require, default: function(answers){
        return answers.appId;
    }},
    {type: 'input', name: 'appMongoDbNameDev', message: 'Enter app MongoDB database name (dev)', validate: validator.require, default: function(answers){
        return answers.appId.concat('Dev');
    }},

    // Redis
    {type: 'input', name: 'appRedisHostProd', message: 'Enter app Redis host (prod)', validate: validator.require, default: function(answers){
        return 'redis.'.concat(answers.appRootDomain);
    }},
    {type: 'input', name: 'appRedisHostDev', message: 'Enter app Redis host (dev)', validate: validator.require, default: function(answers){
        return 'dev-'.concat(answers.appRedisHostProd);
    }},

    {type: 'input', name: 'appRedisPostProd', message: 'Enter app Redis post (prod)', validate: validator.require, default: 6379},
    {type: 'input', name: 'appRedisPostDev', message: 'Enter app Redis post (dev)', validate: validator.require, default: 6379}

];