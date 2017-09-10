import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default function (initialState = {}) {
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
  } else {
    store = createStore(reducer, initialState, applyMiddleware(thunk));
  }
  return store;
}
