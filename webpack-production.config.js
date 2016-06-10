const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  // commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false,
});

module.exports = config;
