import makeConfig from "./make-webpack-config";

export default makeConfig({
  devServer: true,
  devtool: "inline-source-map",
  debug: true
});
