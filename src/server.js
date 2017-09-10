/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import routes from './routes';


function renderFullPage(html) {
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
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
}

function renderApp(req, res) {
  const context = {};
  const html = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>,
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.send(renderFullPage(html));
  }
}

module.exports = renderApp;
