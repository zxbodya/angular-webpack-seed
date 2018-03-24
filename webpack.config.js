const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  devtool: 'source-map',
  separateStylesheet: false,
  debug: true,
});

module.exports = config;
