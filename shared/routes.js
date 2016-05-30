import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './containers/Home';
import Routes from './containers/Routes';

export default (

    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route name="routes" path="ruta/:from/:to/:date/:encoded" component={Routes}></Route>
    </Route>

);
