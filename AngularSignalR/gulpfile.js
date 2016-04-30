'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cleanCss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  inject = require('gulp-inject'),
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  rename = require('gulp-rename'),
  del = require('del'),
  ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps')

var config = {
  jsBasePath: 'App/',
  ts: 'App/**/*.ts',
  js: 'App/**/*.js',
  dist: './dist',
  jsDist: 'dist/**/*.js',
  indexDev: 'index.dev.html'
}

//Typescript compiler and sourcemaps
var tsProject = ts.createProject({
  target: 'ES5',
  module: 'CommonJS',
  noExternalResolve: false,
  noEmitOnErrors: true,
  noImplicitAny: true
});

gulp.task('typescript', function () {
  var tsResult = gulp.src(config.ts)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsBasePath));
});

gulp.task('watchTypescript', ['typescript'], function () {
  gulp.watch(config.ts, ['typescript']);
});
//End Typescript

//Inject
gulp.task('inject', ['typescript'], function (cb) {
  var target = gulp.src(config.indexDev);
  var sources = gulp.src([config.js]);

  return target.pipe(inject(sources))
            .pipe(gulp.dest('.'));
});
// End inject

//Useref
gulp.task('useref', ['inject'], function () {
  var source = gulp.src(config.indexDev);

  return source
    .pipe(useref())
    .pipe(gulpif('*.css', cleanCss()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(config.dist));
});
//End Useref

//Move/Rename
gulp.task('renameIndexDist', ['useref'], function (cb) {
  return gulp.src(config.dist + '/' + config.indexDev)
    .pipe(rename({
      basename: 'index'
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('removeIndexDist', ['renameIndexDist'], function (cb) {
  return del([config.dist + '/' + config.indexDev], { force: true });
});

gulp.task('copyDist', ['removeIndexDist'], function () {
  return gulp.src(config.dist + '/**/*.*')
    .pipe(gulp.dest('.'));
});

gulp.task('moveDist', ['copyDist'], function () {
  return del([config.dist], { force: true });
});

gulp.task('renameIndexDev', ['inject'], function () {
  return gulp.src('./' + config.indexDev)
    .pipe(rename({
      basename: 'index'
    }))
    .pipe(gulp.dest('.'));
});
//End Move/Rename

gulp.task('scripts', function () {
  console.log('mode: ' + process.env.NODE_ENV);
  if (process.env.NODE_ENV == 'Debug') {
    gulp.start('renameIndexDev');
  }
  else {
    gulp.start('moveDist');
  }
});

gulp.task('default', ['scripts']);

