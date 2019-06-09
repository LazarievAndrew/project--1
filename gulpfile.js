var gulp = require('gulp');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('scss:prod', function () {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss("bundle.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scss:dev', function () {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html:prod', function () {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('html:dev', function () {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('normalize', function () {
    return gulp.src('./src/normalize.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['scss:dev']). on('change', browserSync.reload);
    gulp.watch('./src/*.html', ['html:dev']). on('change', browserSync.reload);
    gulp.watch('./src/images/*.*', ['images:dev']);
});

gulp.task('images:prod', function () {
    return gulp.src('./src/images/*.*')
    .pipe(image())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('images:dev', function () {
    return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('default', ['browser-sync', 'scss:dev', 'html:dev', 'normalize', 'images:dev', 'watch']);

gulp.task('prod', ['scss:prod', 'html:prod', 'normalize', 'images:prod']);