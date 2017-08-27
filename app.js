var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');

var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var http = require('http');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
var app = express();

connection.connect();

app.use(express.static(path.join(__dirname, '/public')));
app.get('/weather', function(req, res) {
    let data;
    connection.query("SELECT * FROM data", function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }


        data = JSON.stringify(result);
        res.send(data);

    });

    console.log(data)
})
app.listen(3000);

//默认任务
gulp.task('default',['reload','minifycss','minifyjs']);


//监听
gulp.task('reload', function() {
    browserSync({
        server: {
            baseDir: "./public"
        }
    })
    console.log(111)
    gulp.watch("/public/css/*.css").on("change", browserSync.reload)
    gulp.watch("/public/*.html").on("change", browserSync.reload)
})

gulp.task('minifycss', function() {
    return gulp.src('/public/css/*.css')      //压缩的文件
        .pipe(gulp.dest('minified/css'))   //输出文件夹
        .pipe(minifycss());   //执行压缩
});

gulp.task('minifyjs', function() {
    return gulp.src('/public/javascript/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

