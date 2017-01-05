var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');


gulp.task('build', function (callback) {
  runSequence("lint","sass", callback);
});
 
gulp.task('lint', function(callback) {
  return gulp.src(['server.js','./lib/*.js','./api/*.js','./controllers/*.js','./views/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default').on('end', callback));
});

gulp.task('sass', function (callback) {
  return gulp.src('./public/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/assets/css'));
});