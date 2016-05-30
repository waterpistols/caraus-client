import express                   from 'express';
import React                     from 'react';
import {renderToString}        from 'react-dom/server'
import {Router, RouterContext, match} from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from '../shared/routes';
import {createStore, combineReducers} from 'redux';
import {Provider}   from 'react-redux';
import * as reducers from 'reducers';
import {applyMiddleware} from 'redux';
import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import path from 'path';
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../dist')));
app.set('views', path.join(__dirname, 'views'));

app.use((req, res) => {
    const location = createLocation(req.url);
    const reducer = combineReducers(reducers);

    const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

    match({routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) {
            return res.status(404).end('Not found.');
        }

        function renderView() {
            const InitialComponent = (
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const initialState = store.getState();
            return {
                html: '', //renderToString(InitialComponent),
                initialState: JSON.stringify(initialState)
            };
        }

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(renderView)
            .then(view => {
                res.render('index', {
                    html: view.html,
                    initialState: view.initialState,
                    livereloadJs: 'livereload.js'
                });
            })
            .catch(err => res.end(err.message));
    });
});
export default app;
