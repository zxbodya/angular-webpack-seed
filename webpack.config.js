const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  devtool: 'source-map',
  separateStylesheet: true,
  debug: true,
});

module.exports = config;
