const webpack = require('webpack'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  postcssImport = require('postcss-import'),
  postcssExtend = require('postcss-extend'),
  postcssReporter = require('postcss-reporter'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const glob = require("glob");
const _ = require('lodash');

const extractStyles = new ExtractTextPlugin({ filename: 'css/[name].css' });

module.exports = env => {

  return {
    context: path.resolve(__dirname, 'src'),

    entry: glob.sync('./src/*.js').reduce((entries, entry) => Object.assign(entries, {
      [entry.replace('./src/', '').replace('.js', '')]: entry.replace('./src/', './')
    }), {}),

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
    },


    watch: env.dev,

    devtool: 'cheap-module-eval-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      watchContentBase: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src/js'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                env: "env",
                cacheDirectory: true,
                plugins: ['transform-runtime']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                emitWarning: true,
                configFile: '.eslintrc'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: [
                    postcssImport,
                    postcssExtend,
                    postcssReporter({ clearReportedMessages: true }),
                  ]
                }
              }
            ],
            publicPath: '../'
          })
        },
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                   minimize: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: [
                    autoprefixer({
                      browsers: [
                        '> 5%',
                        'last 2 versions',
                        'Firefox > 20',
                        'not ie <= 8'
                      ],
                      cascade: false
                    }),
                    postcssReporter({ clearReportedMessages: true }),
                  ]
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ],
            publicPath: '../'
          })
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets/',
                publicPath: 'dist/',
                progressive: true,
                pngquant: {
                  quality: '75-90',
                  speed: 4
                },
                mozjpeg: {
                  quality: 75
                },
                gifsicle: {
                  interlaced: true
                }
              }
            },
          ]
        },
        {
          test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets/',
                publicPath: 'dist/'
              }
            }
          ]
        },
      ]
    },

    plugins: [
      new UglifyJsPlugin(),

      new webpack.DefinePlugin({
        LANG: JSON.stringify("en")
      }),

      new webpack.optimize.CommonsChunkPlugin({
        children: true,
      }),

      extractStyles,

      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src/scss',
        files: '**/*.scss',
        failOnError: false,
        quiet: true,
      }),

      new BrowserSyncPlugin({
        files: ["dist/**/*.*", "*.php"],
        reloadOnRestart: true,
        proxy: "localhost:8888",
      }),
    ],
  }
};