var express = require('express'); // http server
var morgan = require('morgan'); //เก็บ Log
var compression = require('compression'); //บีบอัดข้อมูล
var bodyParser = require('body-parser'); //รับ req body
//var sass = require('node-sass-middleware'); // ใช้งาน sass
//var validator = require('express-validator'); //ตัว Validator
//var cookieSession = require('cookie-session');
var session = require('express-session');
//var RedisStore = require('connect-redis')(session); //ต้องมี express-session
var config = require('./config');


module.exports = function(){
    var app = express();

    if(process.env.NODE_ENV==='development'){
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }

    //config - cookie-session
    /*
    app.use(cookieSession({
        name: 'session',
        keys: ['auoishdoaasdiojas', '4sf6d5sdf8sd6f45sd'] //ใส่ไป 2 key ให้หมุนเวียนการใช้
    }))*/
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        // store: new RedisStore({
        //     host: 'localhost',
        //     port: 6379,
        //     db: 2,
        //     pass: 'redis_password'
        // })
    }))


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    //app.use(validator()); //ใส่หลัง bodyParser ทันที

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);

    //config SASS
    /*app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed', // compressed, compact, expanded
        prefix: '/css',
        debug: true,
        //indentedSyntax: true //ใช้กับ sass
    }));*/

    app.use(express.static('./public'));

    return app;
}