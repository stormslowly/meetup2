'use strict';
// npm i --save-dev  gulp gulp-less gulp-util gulp-autoprefixer node-notifier gulp-mocha gulp-notify
var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var _notify = require('gulp-notify');
var nn = require('node-notifier');
var react = require('gulp-react');
var mocha = require('gulp-mocha');
var notify = _notify.withReporter(function(options, callback) {
  new nn.Growl().notify(options, callback);
});

gulp.task('default', ['less', 'mocha']);

gulp.task('less', function() {
  return gulp.src('less/style.less')
    .pipe(less())
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>',
      emitError: true
    }))
    .on('error', function(e) {
      gutil.log(e);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(notify('Less success!'));
});

gulp.task('watch', function() {
  gulp.watch('views/jsx/component/**/*.jsx', ['jsx']);
  gulp.watch(['api/**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('jsx', function() {
  return gulp.src('views/jsx/component/**/*.jsx')
    .pipe(react())
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>',
      emitError: true
    }))
    .on('error', function(e) {
      gutil.log(e);
      this.emit('end');
    })
    .pipe(gulp.dest('assets/js/react/'));
});

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.js'], {
      read: false,
    })
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 9000,
      iu: 'bdd'
    }))
    .on('error', notify.onError({
      message: 'mocha failed: <%= error.message %>',
      emitError: false
    }));
});