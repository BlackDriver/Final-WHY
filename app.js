var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
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
gulp.task('default',['reload']);

//压缩图片
gulp.task('compressimg',function(){
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'));
})
//监听
gulp.task('reload', function () {
    browserSync({
        server: {
            baseDir: "./public"
        }
    })

    gulp.watch("css/*.css").on("change", browserSync.reload)
    gulp.watch("HTML/*.html").on("change", browserSync.reload)
})
