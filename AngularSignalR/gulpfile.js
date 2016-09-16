'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cleanCss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  inject = require('gulp-inject'),
  useref = require('gulp-useref'),
  rename = require('gulp-rename'),
  del = require('del'),
  ts = require('gulp-typescript'),
  tslint = require('gulp-tslint'),
  sourcemaps = require('gulp-sourcemaps'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  ngAnnotate = require('gulp-ng-annotate'),
  runSequence = require('run-sequence'),
  filter = require('gulp-filter'),
  bower = require('gulp-bower'),
  wiredep = require('wiredep').stream

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
  noEmitOnErrors: false,
  noImplicitAny: true
});

gulp.task('tslint', function () {
  gulp.src(config.ts)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      emitError: true,
      sort: true,
      fullPath: true,
      reportLimit: 10
    }))
});

gulp.task('typescript', ['tslint'], function () {
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

//Bower
gulp.task('bower', function () {
  return bower();
});

gulp.task('wiredep', ['bower'], function () {
  var source = gulp.src('./' + config.indexDev);

  return source.pipe(wiredep({}))
    .pipe(gulp.dest('.'));
});
//End Bower

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
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return source
    .pipe(useref())
    .pipe(cssFilter)
    .pipe(cleanCss())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(rev())
    .pipe(revReplace())
    .pipe(gulp.dest(config.dist));
});
//End Useref

//Move/Rename
gulp.task('renameIndexDist', function (cb) {
  return gulp.src(config.dist + '/index-*.dev.html')
    .pipe(rename({
      basename: 'index'
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('removeFiles', function (cb) {
  return del([config.dist + '//index-*.dev.html', 'Content/lib-*.min.css', 'Scripts/app-*.min.js', 'Scripts/lib-*.min.js'], { force: true });
});

gulp.task('copyDist', function () {
  return gulp.src(config.dist + '/**/*.*')
    .pipe(gulp.dest('.'));
});

gulp.task('removeDist', function () {
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
    runSequence('wiredep', 'inject', 'renameIndexDev');
  }
  else {
    runSequence('wiredep', 'useref', 'renameIndexDist', 'removeFiles', 'copyDist', 'removeDist');
  }
});

gulp.task('default', ['scripts']);

