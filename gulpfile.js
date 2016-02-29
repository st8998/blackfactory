'use strict'

const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const del = require('del')
const nodemon = require('nodemon')
const slm = require('gulp-slm')
const karma = require('karma')
const connect = require('gulp-connect')
const childProcess = require('child_process')

// SLIM
gulp.task('slim', function () {
  gulp.src('./src/*.slim')
    .pipe(slm({ pretty: true }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('slim-watch', ['slim'], function () {
  gulp.watch('./src/*.slim', ['slim'])
})

// WEBPACK CONFIG
const config = {
  entry: { main: './src/main.js', spec: './tests/spec/main_spec.js', e2e: './tests/e2e/main_e2e.js' },
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { loader: 'ng-annotate', test: /\.js$/, exclude: /node_modules/ },
      { loaders: ['html', 'slm'], test: /\.(slm|slim)$/, exclude: /node_modules/ },
      {
        loader: 'babel-loader',
        test: /\.js$/, exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['stage-0', 'es2015'],
        },
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['./src', './tests', 'node_modules'],
  },
}

gulp.task('clean-build', done => del('./build', done))

gulp.task('build', function (done) {
  webpack(config).run(function (err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Compilled')
      done()
    }
  })
})

gulp.task('run', ['build', 'slim-watch'], function () {
  webpack(config).watch(100, function (err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Recompilled')
      nodemon.restart()
    }
  })
})

gulp.task('test', ['build'], function (done) {
  new karma.Server({ configFile: `${__dirname}/karma.conf.js` }, done).start()

  webpack(config).watch(100, function (err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Recompilled')
    }
  })
})

function getProtractorBinary(binaryName) {
  const pkgPath = require.resolve('protractor')
  const protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'))
  return path.join(protractorDir, binaryName)
}

gulp.task('e2e', ['build', 'slim'], function (done) {
  connect.server({
    root: 'build/',
    port: 8888,
  })

  const args = ['--baseUrl', 'http://127.0.0.1:8888']

  webpack(config).watch(100, function (err) {
    if (err) {
      console.log('Error', err)
    } else {
      childProcess.spawn(getProtractorBinary('protractor'), args, { stdio: 'inherit' })
    }
  })
})
