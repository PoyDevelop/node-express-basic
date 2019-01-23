process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'); //ต้องไว้ก่อน express เพราะเชื่อมต่อ db
var express = require('./config/express');

var db = mongoose(); //ต้องโหลดก่อน เพราะสร้าง db
var app = express();


app.listen(3000);
module.exports = app;

console.log(process.env.NODE_ENV);
console.log('Server run at http://localhost:3000');