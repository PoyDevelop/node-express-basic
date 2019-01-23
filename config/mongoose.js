var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
    //mongoose.set('debug', config.debug); //เปิด Debug
    var db = mongoose.connect(config.mongoUri, {useNewUrlParser: true}); //เชื่อมต่อ

    require('../app/models/user.model');

    return db;
};