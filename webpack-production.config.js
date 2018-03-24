const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  // commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  devtool: false,
  mode: 'production',
});

module.exports = config;
