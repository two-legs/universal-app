/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default function (initialState = {}) {
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducer, initialState, compose(
      applyMiddleware(thunk),
      (typeof window !== 'undefined' && window.devToolsExtension)
        ? window.devToolsExtension()
        : f => f,
    ));
  } else {
    store = createStore(reducer, initialState, applyMiddleware(thunk));
  }
  return store;
}
