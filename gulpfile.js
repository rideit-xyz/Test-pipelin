var gulp = require('gulp');
const jshint = require('gulp-jshint');


gulp.task('build', function (callback) {
  runSequence("lint", callback);
});
 
gulp.task('lint', function(callback) {
  return gulp.src('server.js','./lib/*.js','./api/*.js','./controller/*.js','./lib/*.js','./views/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default').on('end', callback));
});