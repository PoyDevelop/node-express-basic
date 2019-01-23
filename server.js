process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);

var mongoose = require('./config/mongoose'); //ต้องไว้ก่อน express เพราะเชื่อมต่อ db
var express = require('./config/express');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;

console.log('Server run at http://localhost:3000');