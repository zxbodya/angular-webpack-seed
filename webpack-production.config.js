import makeWebpackConfig from './make-webpack-config';

export default makeWebpackConfig({
  //commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false
});
