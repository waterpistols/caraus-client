import React       from 'react';
import {render}  from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes      from 'routes';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from 'reducers';
import * as Immutable from 'immutable';
import {applyMiddleware} from 'redux';
import promiseMiddleware from 'lib/promiseMiddleware';


const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

render(
    <Provider store={store}>
        <Router children={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('react-view')
);
