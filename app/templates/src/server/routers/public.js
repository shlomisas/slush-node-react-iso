/**
 * Created by Shlomi on 02/07/2015.
 */

import express from 'express';
import React from 'react/addons';
import iso from 'iso';

import IndexApp from '../../client/components/index/main';
import IndexFlux from '../../client/apps/index';

var router = express.Router();
router.get('/', (req, res, next) => {
    var flux = new IndexFlux();

    var html = React.renderToString(React.createElement(IndexApp, {flux: flux}));

    res.render('public/index', {
        pageId: 'index',
        reactOutput: iso.render(html, flux.flush())
    });
});

export default router;