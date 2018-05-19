const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  devServer: true,
  devtool: 'inline-source-map',
  debug: true,
});

config.serve = {
  content: 'public',
  dev: {
    compress: false,
    watchOptions: {
      aggregateTimeout: 300,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/_assets/',
    stats: Object.assign({ colors: true }, config.devServer.stats),
  },
  clipboard: false,
};

module.exports = config;
