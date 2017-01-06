/***********************************
 * Module dependencies.
 ************************************/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

/***********************************
 * initial tasks sequence
 ************************************/
gulp.task('build', function (callback) {
  runSequence('lint','sass','minify-css', callback);
});


/***********************************
 * build sequence related tasks
 ************************************/ 
//Code quality
gulp.task('lint', function(callback) {
  return gulp.src(['server.js','./lib/*.js','./api/*.js','./controllers/*.js','./views/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//CSS compilation
gulp.task('sass', function (callback) {
  return gulp.src('./public/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('minify-css', function (callback) {
  return gulp.src('./public/assets/css/material-single-page.css')    
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe (sourcemaps.write('./'))
    .pipe(gulp.dest('./public/assets/css'));
});