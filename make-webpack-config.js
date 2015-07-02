'use strict';

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = function (options) {
  var entry;

  entry = {
    main: "./src/index",
  };


  var defaultLoaders = [
    {test: /\.coffee$/, loaders: ['coffee-redux-loader']},
    {test: /\.json5$/, loaders: ['json5-loader']},
    {test: /\.txt$/, loaders: ['raw-loader']},
    {test: /\.(png|jpg|jpeg|gif|svg)$/, loaders: ['url-loader?limit=10000']},
    {test: /\.(woff|woff2)$/, loaders: ['url-loader?limit=100000']},
    {test: /\.(ttf|eot)$/, loaders: ['file-loader']},
    {test: /\.(wav|mp3)$/, loaders: ['file-loader']},
    {test: /\.html$/, loaders: ['html-loader']},
    {test: /\.(md|markdown)$/, loaders: ["html-loader", "markdown-loader"]},

    //font awesome
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }
  ];

  var stylesheetLoaders = [
    {test: /\.css$/, loaders: ['css-loader']},
    {test: /\.less$/, loaders: ['css-loader!less-loader']},
    {test: /\.styl$/, loaders: ['css-loader!stylus-loader']},
    {test: /\.(scss|sass)$/, loader: "style!css!sass?sourceMap"}
  ];

  var alias = {};
  var aliasLoader = {};
  var externals = [];
  var modulesDirectories = ["web_modules", "node_modules"];
  var extensions = ["", ".web.js", ".js", ".jsx"];
  var root = path.join(__dirname, "app");
  //var publicPath = options.devServer
  //  ? "http://localhost:2992/assets/"
  //  : '/assets/';
  var publicPath = '/_assets/';

  var output = {
    path: path.join(__dirname, 'public', "_assets"),
    publicPath: publicPath,
    filename: "[name].js" + (options.longTermCaching ? "?[chunkhash]" : ""),
    chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching ? "?[chunkhash]" : ""),
    sourceMapFilename: "debugging/[file].map",
    pathinfo: options.debug
  };
  var excludeFromStats = [
    /node_modules[\\\/]angular[\\\/]/
  ];
  var plugins = [
    function () {
      this.plugin("done", function (stats) {
        var jsonStats = stats.toJson({
          chunkModules: true,
          exclude: excludeFromStats
        });
        jsonStats.publicPath = publicPath;
        require("fs").writeFileSync(path.join(__dirname, "build", "stats.json"), JSON.stringify(jsonStats));
      });
    },
    new webpack.PrefetchPlugin("angular")
  ];

  if (options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching ? "?[chunkhash]" : "")));
  }


  stylesheetLoaders = stylesheetLoaders.map(function (loader) {
    if (Array.isArray(loader.loaders)) {
      loader.loaders = loader.loaders.join("!");
    }
    if (options.separateStylesheet) {
      loader.loaders = ExtractTextPlugin.extract("style-loader", loader.loaders);
    } else {
      loader.loaders = "style-loader!" + loader.loaders;
    }
    loader.loaders = loader.loaders.split('!');
    return loader;
  });

  if (options.separateStylesheet) {
    plugins.push(new ExtractTextPlugin('[name].css' + (options.longTermCaching ? '?[contenthash]' : '')));
  }
  if (options.minimize) {
    plugins.push(
      new NgAnnotatePlugin({
        add: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }
  var ignoreLoaders = [];
  return {
    entry: entry,
    output: output,
    target: 'web',
    module: {
      loaders: ignoreLoaders
        .concat([
          {
            test: /\.jsx?$/,
            loaders: ['babel?optional[]=runtime'],
            exclude: /node_modules/
          }
        ])
        .concat(defaultLoaders)
        .concat(stylesheetLoaders)
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, "node_modules"),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};
