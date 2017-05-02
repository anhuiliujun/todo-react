import { createStore, applyMiddleware, compose } from 'redux';
import { createCycleMiddleware } from 'redux-cycles';
import {run} from '@cycle/run';
import {makeHTTPDriver} from '@cycle/http';
import {timeDriver} from '@cycle/time';

import rootReducer from './reducers';
import main from './cycle';

export default function configureStore() {
    const cycleMiddleware = createCycleMiddleware();
    const { makeActionDriver, makeStateDriver } = cycleMiddleware;

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(cycleMiddleware)
        )
    );

    run(main, {
        ACTION: makeActionDriver(),
        STATE: makeStateDriver(),
        Time: timeDriver,
        HTTP: makeHTTPDriver(),
    })

    return store;
}
