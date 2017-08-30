const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, './src/index'),
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, './src')],
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },

      {
        test: /\.p?css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[folder]_[local]_[hash:base64:4]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|ttf|png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: DEVELOPMENT ? 0 : 16384,
              name: 'assets/[hash:base64:10].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
   
  devtool: 'source-map-eval',

  stats: {
    color: true,
    chunks: false,
    children: false,
  },
};

module.exports = config;