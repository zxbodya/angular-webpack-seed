import makeWebpackConfig from './make-webpack-config';

const config = makeWebpackConfig({
  devtool: 'source-map',
  separateStylesheet: true,
  debug: true
});

export default config;
module.exports = config;
