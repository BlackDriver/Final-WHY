var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');


gulp.task('default',["minifycss","minifyjs"])

gulp.task('minifycss', function() {

    gulp.src('public/css/*.css')

        .pipe(minifycss())

        .pipe(gulp.dest('public/minified/css'))
});

gulp.task('minifyjs', function() {

    gulp.src('public/javascript/index.js')

        .pipe(uglify())

        .pipe(gulp.dest('public/minified/javascript'))
});

