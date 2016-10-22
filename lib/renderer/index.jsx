/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import makeStore from './store';
import App from './components/app';

const store = makeStore();

window.store = store;
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  const hot = module.hot;
  hot.accept();
  hot.dispose(() => {
    // eslint-disable-next-line no-console
    console.log('[HMR] Reloading');
    window.location.reload();
  });
}
