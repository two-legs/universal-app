import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './containers/App/App';

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
  const html = ReactDOM.renderToString(<App />);

  return res.send(renderFullPage(''));
}

module.exports = renderApp;
