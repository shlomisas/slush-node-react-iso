/**
 * Created by Shlomi on 02/08/2015.
 */

import React from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class extends React.Component{
    shouldComponentUpdate = shouldPureComponentUpdate;
}
