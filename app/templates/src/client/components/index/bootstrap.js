/**
 * Created by Shlomi on 03/07/2015.
 */

import 'purecss';
import '../../stylus/index.styl';

import 'expose?$!jquery';

import React from 'react/addons';
import iso from 'iso';

import ReactApp from './main';
import IndexFlux from '../../apps/index';

iso.bootstrap((state, meta, container) => {
    var flux = new IndexFlux();
    flux.bootstrap(state);
    React.render( React.createElement(ReactApp, {flux: flux}), container);
});
