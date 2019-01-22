var express = require('express'); // http server
var morgan = require('morgan'); //เก็บ Log
var compression = require('compression'); //บีบอัดข้อมูล
var bodyParser = require('body-parser'); //รับ req body


module.exports = function(){
    var app = express();
    if(process.env.NODE_ENV==='development'){
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    require('../app/routes/index.routes')(app);
    return app;
}