var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack');

gulp.task('release', function() {
    return gulp.src('src/Wizard.jsx')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});


gulp.task('bundleSimple', function(cb) {
  webpack({
    target: 'web',
    bail: true,
    entry: {
      index: './examples/simple/index.js',
    },
    output: {
      path: './examples/simple/',
      filename: '[name].bundle.js'
    },
    plugins: [
       new webpack.LoaderOptionsPlugin({
           debug: true
       })
    ]
  }, cb);
});

gulp.task('bundleData', function(cb) {
  webpack({
    target: 'web',
    bail: true,
    entry: {
      index: './examples/data/index.js',
    },
    output: {
      path: './examples/data/',
      filename: '[name].bundle.js'
    },
    plugins: [
       new webpack.LoaderOptionsPlugin({
           debug: true
       })
    ]
  }, cb);
});


gulp.task('bundleSkip', function(cb) {
  webpack({
    target: 'web',
    bail: true,
    entry: {
      index: './examples/skip/index.js',
    },
    output: {
      path: './examples/skip/',
      filename: '[name].bundle.js'
    },
    plugins: [
       new webpack.LoaderOptionsPlugin({
           debug: true
       })
    ]
  }, cb);
});

gulp.task('examples', ['release', 'bundleData', 'bundleSkip', 'bundleSimple']);

gulp.task('default', ['release']);
