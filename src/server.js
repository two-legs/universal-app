/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './store';

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="/bundle.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="text/javascript">window.__REDUX_STATE__=${JSON.stringify(initialState)}</script>
        <script type="text/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
}

function renderApp(req, res) {
  const context = {};
  const initialState = { value: 1 };
  const store = createStore();

  const html = ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.send(renderFullPage(html, initialState));
  }
}

module.exports = renderApp;
