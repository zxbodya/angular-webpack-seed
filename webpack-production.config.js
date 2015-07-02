import makeConfig from "./make-webpack-config";

export default makeConfig({
  //commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false
});
