


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

})
app.listen(3000);

