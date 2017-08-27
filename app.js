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

var weatherdata = [  { id: 1, max_temp: 39.4, min_temp: 20.4, weather: '多云' },
   { id: 2, max_temp: 10.2, min_temp: 1.2, weather: '晴' },
   { id: 3, max_temp: 30.1, min_temp: 12.2, weather: '暴雨' },
   { id: 4, max_temp: 41.1, min_temp: 34.2, weather: '冰雹' },
   { id: 5, max_temp: 42.1, min_temp: 22.3, weather: '沙尘暴' },
   { id: 6, max_temp: 12.5, min_temp: 6.6, weather: '台风' },
   { id: 7, max_temp: 21.4, min_temp: 5.2, weather: '雾霾' } ]
// connection.query("SELECT * FROM data",function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return; 
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result[0]);
//        console.log('------------------------------------------------------------\n\n');  
// });

app.use(express.static(path.join(__dirname, '/public')));
app.get('/weather', function (req,res) {
    res.send(weatherdata);
})
app.listen(3000);