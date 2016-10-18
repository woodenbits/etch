import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

export default function makeStore() {
  const middleware = [];

  const enhancer = composeWithDevTools(
    applyMiddleware(...middleware)
  );

  return createStore(reducer, enhancer);
}
