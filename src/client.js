/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './store';

import App from './containers/App/App';

const initialState = window.__REDUX_STATE__ || {};
delete window.__REDUX_STATE__;
const store = createStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
