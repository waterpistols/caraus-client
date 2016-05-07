import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';

export default (

    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route name="login" path="login" component={Login}/>
    </Route>

);