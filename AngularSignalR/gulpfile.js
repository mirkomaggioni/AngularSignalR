'use strict';


//UTILIZZARE WIREDEP, TYPESCRIPT
var gulp = require('gulp'),
        rimraf = require('rimraf'),
        concat = require('gulp-concat'),
        cssmin = require('gulp-cssmin'),
        uglify = require('gulp-uglify');

var config = {
  js: 'App/**/*.js',
  minjs: 'App/**/*.min.js',
  concatjsdest: 'App/site.min.js'
}

//paths.minCss = paths.webroot + 'css/**/*.min.css';
//paths.concatJsDest = paths.webroot + 'js/site.min.js';
//paths.concatCssDest = paths.webroot + 'css/site.min.css';


gulp.task('clean:js', function (callback) {
  console.log('START clean:js');
  rimraf(config.concatjsdest, callback);
});

//gulp.task("clean:css", function (cb) {
//  rimraf(paths.concatCssDest, cb);
//});

gulp.task('clean', ['clean:js']);
//gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task('min:js', function () {
  console.log('START min:js');

  return gulp.src([config.js, '!' + config.minjs], { base: '.' })
          .pipe(concat(config.concatjsdest))
          .pipe(uglify())
          .pipe(gulp.dest('.'));
});

//gulp.task('min:css', function () {
//  return gulp.src([paths.css, '!' + paths.minCss])
//          .pipe(concat(paths.concatCssDest))
//          .pipe(cssmin())
//          .pipe(gulp.dest('.'));
//});


gulp.task('min', ['min:js']);
//gulp.task('min', ['min:js', 'min:css']);

gulp.task('scripts', ['clean'], function () {
  console.log('START scripts');

  gulp.start('min');
});

gulp.task('default', ['scripts']);

