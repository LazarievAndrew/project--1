var gulp = require('gulp');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['scss']);
});

