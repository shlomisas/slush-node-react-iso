
/**
 * Created by Shlomi on 02/08/2015.
 */

import React from 'react/addons';
import Immutable from 'immutable';

import RootComponent from '../root';

import Header from '../partials/header';
import Footer from '../partials/footer';

export default class IndexComponent extends RootComponent{
    render(){
        return (
            <div>
                <Header></Header>
                <main className = "container">
                    Welcome! :)
                </main>
                <Footer></Footer>
            </div>
        );
    }
}
