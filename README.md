# Slush generator for NodeJS + ReactJS + Flux with Isomorphic support

All written in ES6-7 with babel support 

Contain the following major frameworks/components:

* [Express](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Passport](http://passportjs.org/)
* [React](http://facebook.github.io/react/)
* [Alt (for flux)](altjs.org)
* [ISO (for isomorphic)](https://www.npmjs.com/package/iso)
* [Webpack](https://webpack.github.io/)
* [Mocha](https://mochajs.org/) (may replace)
* [Chai](http://chaijs.com/) (may replace)
* [Sinon](http://sinonjs.org/) (may replace)

After clone/download this repo run:

- `npm link . (temporary)`      
- `slush node-react-iso`

After answer all questions, and install all NPM's run:  

- `gulp init`
- `gulp build-all`  
- `cd dist/server`  
* `node app.js`  

Than go to your browser and run:

`http://\<your-selected-domain\>:\<your-selected-port\>`  
p.s. Your-selected-domain and your-selected-port is what your choise during the slush installation

Notes:

    * The generator just built quick-and-dirty, need to improve more and will change serioucly from time to time (if i'll have time:), so consider it as 85% ready to use..

