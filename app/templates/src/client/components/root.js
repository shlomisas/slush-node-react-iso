/**
 * Created by Shlomi on 29/08/2015.
 */

import React from 'react/addons';
import BaseComponent from './base';

export default class RootComponent extends BaseComponent{
    static childContextTypes =  {
        flux: React.PropTypes.object.isRequired
    };

    constructor() {
        super(...arguments);
        this.flux = this.props.flux;
    }

    getChildContext() {
        return {
            flux: this.props.flux || new Error('flux app not found!')
        };
    }
}
