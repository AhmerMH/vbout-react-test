import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';

import './styles.css';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>
    , rootElement);
