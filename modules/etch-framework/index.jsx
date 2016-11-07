/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/app';

function boot(element: HTMLElement) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  );
}

export { boot };

if (module.hot) {
  const hot = module.hot;
  hot.accept();
  hot.dispose(() => {
    // eslint-disable-next-line no-console
    console.log('[HMR] Reloading');
    window.location.reload();
  });
}
