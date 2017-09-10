import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default function (history, client, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [reduxRouterMiddleware, thunk];

  const store = createStore(reducer, initialState, applyMiddleware(middleware));
  return store;
}
