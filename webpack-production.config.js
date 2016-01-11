import makeWebpackConfig from './make-webpack-config';

const config = makeWebpackConfig({
  //commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false
});

export default config;
module.exports = config;
