import makeWebpackConfig from './make-webpack-config';

export default makeWebpackConfig({
  devtool: 'source-map',
  separateStylesheet: true,
  debug: true
});
