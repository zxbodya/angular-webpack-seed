import makeConfig from "./make-webpack-config";

export default makeConfig({
  devtool: "source-map",
  separateStylesheet: true,
  debug: true
});
