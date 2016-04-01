'use strict'

const cssnext = require('postcss-cssnext')
const postcssSVG = require('postcss-inline-svg')
const postcssMixins = require('postcss-mixins')
const postcssNested = require('postcss-nested')


module.exports = {
  devtool: 'eval-source-map',
  entry: './src/main.js',
  target: 'web',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { loaders: ['html', 'slm'], test: /\.(slm|slim)$/, exclude: /node_modules/ },
      {
        loader: 'style-loader!css-loader!postcss-loader',
        test: /\.css$/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
        query: {
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['./src', './tests', 'node_modules'],
  },
  postcss: function () {
    return [
      cssnext(),
      postcssSVG({ path: './src' }),
      postcssMixins(),
      postcssNested(),
    ]
  },
}
