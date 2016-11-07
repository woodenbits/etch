/* @flow */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const middleware = [];

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware)
);

const store = createStore(reducer, enhancer);

export default store;
window.store = store;

if (module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const $reducer = require('./reducers').default;
    store.replaceReducer($reducer);
  });
}
