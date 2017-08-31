/* eslint-disable global-require, no-console */
require('babel-register');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const DEVELOPMENT = process.env.NODE_ENV === 'development';

if (DEVELOPMENT) {
  const webpack = require('webpack');
  const config = require('./webpack.config');

  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  const devMiddlewareConfig = {
    publicPath: config.output.publicPath,
    stats: config.stats,
  };

  app.use(devMiddleware(compiler, devMiddlewareConfig));
  app.use(hotMiddleware(compiler));
}

app.use(express.static('public'));

const serverRender = require('./src/server');

app.get('*', serverRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
