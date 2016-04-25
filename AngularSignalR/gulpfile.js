'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    del = require('del')

var config = {
  js: 'App/**/*.js',
  dist: './dist',
  indexDev: 'index.dev.html'
}

//Inject
gulp.task('inject', function (cb) {
  var target = gulp.src('index.dev.html');
  var sources = gulp.src([config.js]);

  return target.pipe(inject(sources))
            .pipe(gulp.dest('.'));
});
// End inject

//Useref
gulp.task('useref', ['inject'], function () {
  var source = gulp.src('index.dev.html');

  return source
    .pipe(useref())
    .pipe(gulpif('*.css', cleanCss()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(config.dist));
});
//End Useref

//Move/Rename
gulp.task('renameIndexDist', ['inject'], function (cb) {
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
  if (process.env.NODE_ENV == 'Debug') {
    gulp.start('inject', 'renameIndexDev');
  }
  else {
    gulp.start('inject', 'useref', 'moveDist');
  }
});

gulp.task('default', ['scripts']);

