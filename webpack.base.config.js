const path = require('path');
const webpack = require('webpack');
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UnusedFilesWebpackPlugin from 'unused-files-webpack-plugin';
import CaseSesitiveWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
import {DuplicatesPlugin} from 'inspectpack/plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

export default new Config().merge({
  entry: ['./index.jsx'],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    hot: true,
    // contentBase: './public',
    // watchContentBase: true,
    // https: process.env.HTTPS === 'true',
    // host: process.env.HOST || '0.0.0.0',
    // public: '0.0.0.0',
    // publicPath: '/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.pcss$/,
        exclude: [
          path.resolve(__dirname, 'stylesheets'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              modules: true,
              localIdentName: '[folder]-[local]-[hash:base64:4]',
              sourceMap: devMode,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'stylesheets'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    ...(devMode
      ? [
          new webpack.HotModuleReplacementPlugin(),
          // new UnusedFilesWebpackPlugin({
          //   globOptions:
          //     {
          //       ignore: [
          //         'node_modules/**/*',
          //         'stylesheets/semantic-ui-css/**/*',
          //         'fonts/**/*',
          //         'images/**/*',
          //         '**/*/package.json'
          //       ]
          //     }
          // }),
          new CaseSesitiveWebpackPlugin(),
          // new CircularDependencyPlugin({
          //   // exclude detection of files based on a RegExp
          //   exclude: /node_modules/,
          //   // include specific files based on a RegExp
          //   include: /configs/,
          //   // add errors to webpack instead of warnings
          //   failOnError: true,
          //   // allow import cycles that include an asyncronous import,
          //   // e.g. via import(/* webpackMode: "weak" */ './file.js')
          //   allowAsyncCycles: false,
          //   // set the current working directory for displaying module paths
          //   cwd: process.cwd(),
          // }),
          // new DuplicatesPlugin({
          //   // Emit compilation warning or error? (Default: `false`)
          //   emitErrors: false,
          //   // Handle all messages with handler function (`(report: string)`)
          //   // Overrides `emitErrors` output.
          //   emitHandler: undefined,
          //   // Display full duplicates information? (Default: `false`)
          //   verbose: false
          // })
        ]
      : [
          new MiniCssExtractPlugin({
            filename: '[name].bundle.css?v=[contenthash]',
          }),
        ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./antdIcons")
    },
  },
  externals: {
    config: JSON.stringify({
      backendServiceHost: '/',
      avestPluginHost: 'https://sign.client.bps-sberbank.by:6598/',
    }),
  },
});
