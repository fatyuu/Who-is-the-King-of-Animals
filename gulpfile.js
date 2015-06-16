var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');


gulp.task('default', function () {
  gulp.src('less/*.less')
    .pipe(watch('less/*.less'))
    .pipe(less())
    .pipe(gulp.dest('css/'));
});