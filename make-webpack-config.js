const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


module.exports = function (options) {
  const entry = {
    main: './src/index',
  };

  const defaultLoaders = [
    { test: /\.coffee$/, loaders: ['coffee-redux-loader'] },
    { test: /\.json5$/, loaders: ['json5-loader'] },
    { test: /\.txt$/, loaders: ['raw-loader'] },
    { test: /\.(png|jpg|jpeg|gif|svg)$/, loaders: ['url-loader?limit=10000'] },
    // {test: /\.(woff|woff2)$/, loaders: ['url-loader?limit=100000']},
    // {test: /\.(ttf|eot)$/, loaders: ['file-loader']},
    { test: /\.(wav|mp3)$/, loaders: ['file-loader'] },
    { test: /\.html$/, loaders: ['html-loader'] },
    { test: /\.(md|markdown)$/, loaders: ['html-loader', 'markdown-loader'] },

    // font awesome
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+|\?.*)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+|\?.*)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+|\?.*)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+|\?.*)?$/,
      loader: 'file',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+|\?.*)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    },
  ];
  let stylesheetLoaders = [
    { test: /\.css$/, loaders: ['css-loader!postcss-loader'] },
    { test: /\.less$/, loaders: ['css-loader!postcss-loader!less-loader'] },
    { test: /\.styl$/, loaders: ['css-loader!postcss-loader!stylus-loader'] },
    { test: /\.scss$/, loaders: ['css-loader!postcss-loader!sass-loader?sourceMap'] },
    { test: /\.sass$/, loaders: ['css-loader!postcss-loader!sass-loader?sourceMap&indentedSyntax'] },
  ];

  const alias = {};
  const aliasLoader = {};
  const externals = [];
  const modulesDirectories = ['web_modules', 'node_modules'];
  const extensions = ['', '.web.js', '.js', '.jsx'];
  const root = path.join(__dirname, 'app');
  // var publicPath = options.devServer
  //   ? 'http://localhost:2992/assets/'
  //   : '/assets/';
  const publicPath = '/_assets/';

  const output = {
    path: path.join(__dirname, 'public', '_assets'),
    publicPath,
    filename: `[name].js${(options.longTermCaching ? '?[chunkhash]' : '')}`,
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    pathinfo: options.debug,
  };
  const excludeFromStats = [
    /node_modules[\\\/]angular[\\\/]/,
  ];
  const plugins = [
    function statsPlugin() {
      this.plugin('done', (stats) => {
        const jsonStats = stats.toJson({
          chunkModules: true,
          exclude: excludeFromStats,
        });
        jsonStats.publicPath = publicPath;
        if (!options.prerender) {
          require('fs').writeFileSync(path.join(__dirname, 'build', 'stats.json'), JSON.stringify(jsonStats));
        } else {
          require('fs').writeFileSync(path.join(__dirname, 'build', 'server', 'stats.json'), JSON.stringify(jsonStats));
        }
      });
    },
    new webpack.PrefetchPlugin('angular'),
  ];

  if (options.commonsChunk) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin(
        'commons',
        `commons.js${(options.longTermCaching ? '?[chunkhash]' : '')}`
      )
    );
  }


  stylesheetLoaders = stylesheetLoaders.map((loaderIn) => {
    const loader = Object.assign({}, loaderIn);
    if (Array.isArray(loader.loaders)) {
      loader.loaders = loader.loaders.join('!');
    }
    if (options.separateStylesheet) {
      loader.loaders = ExtractTextPlugin.extract('style-loader', loader.loaders);
    } else {
      loader.loaders = `style-loader!${loader.loaders}`;
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
          warnings: false,
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.NoErrorsPlugin()
    );
  }
  const ignoreLoaders = [];

  let jsLoaders;

  if (options.cover) {
    jsLoaders = [
      // transpile all files except testing sources with babel as usual
      {
        test: /\.test\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      // transpile and instrument only testing sources with babel-istanbul
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /\.test\./,
        ],
        loader: 'babel-istanbul',
        query: {
          // cacheDirectory: true
        },
      },
    ];
  } else {
    jsLoaders = [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ];
  }

  return {
    entry,
    output,
    target: 'web',
    module: {
      loaders: ignoreLoaders
        .concat(jsLoaders)
        .concat(defaultLoaders)
        .concat(stylesheetLoaders),
    },
    postcss() {
      return [require('autoprefixer')({ browsers: ['last 1 version'] })];
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
      alias: aliasLoader,
    },
    externals,
    resolve: {
      root,
      modulesDirectories,
      extensions,
      alias,
    },
    plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats,
      },
    },
  };
};
