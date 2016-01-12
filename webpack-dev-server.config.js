import makeWebpackConfig from './make-webpack-config';

const config = makeWebpackConfig({
  devServer: true,
  devtool: 'inline-source-map',
  debug: true
});

export default config;
module.exports = config;
