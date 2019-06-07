var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('.build/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['scss']);
});