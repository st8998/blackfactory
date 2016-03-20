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

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnext = require('postcss-cssnext')
const postcssSVG = require('postcss-inline-svg')
const postcssMixins = require('postcss-mixins')
const postcssNested = require('postcss-nested')

// CSS
gulp.task('css', function () {
  const processors = [
    autoprefixer({ browsers: ['last 1 version'] }),
    // autoreset({ rulesMatcher: 'bem' }),
    cssnext(),
  ]
  return gulp.src('./src/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build'))
})

gulp.task('css-watch', ['css'], function () {
  gulp.watch('./src/**/*.css', ['css'])
})

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
  entry: {
    vendor: ['dexie', 'jquery', 'angular', 'angular-route', 'angular-animate', 'instadate', 'ramda', 'zone.js', 'virtual-dom'],
    main: './src/main.js',
    spec: './tests/spec/main_spec.js',
    e2e: './tests/e2e/main_e2e.js'
  },
  target: 'web',
  devtool: '#inline-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { loader: 'ng-annotate', test: /\.js$/, exclude: /node_modules/ },
      { loaders: ['html', 'slm'], test: /\.(slm|slim)$/, exclude: /node_modules/ },
      {
        loader: 'style-loader!css-loader!postcss-loader',
        test: /\.css$/,
      },
      {
        loader: 'babel-loader',
        test: /\.js$/, exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['stage-0', 'es2015'],
        },
      },
      {
        test: /jquery\.js$/,
        loader: 'expose?jQuery',
      },
    ],
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)],
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
