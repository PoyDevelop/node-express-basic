exports.render = function(req, res){
    var isLoggedIn = false;
    if(typeof req.session.remember !== 'undefined'){
        isLoggedIn = req.session.remember;
    }

    res.render('user', {
        title: 'NodeJS - MVC!',
        message: 'Hello World Jade!',
        isLoggedIn: isLoggedIn
    });

};
exports.login = function(req, res){
    //req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
    //req.sanitizeBody('postparam').toBoolean(); //แปลงเป็น BOolean

    //req.checkParams('urlparam', 'Invalid urlparam').isAlpha(); //ใช่ตัวอักษรไหม
    //req.sanitizeParams('urlparam').trim();

    //req.checkQuery('getparams', 'Invalid getparams').contains('hello'); //มีคำว่า hello
    //req.sanitizeQuery('getparams').escape(); //ตัด

    req.checkBody('email', 'Invalid E-Mail').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if(errors){
        res.render('user', {
            title: 'รูปแบบ E-Mail ไม่ถูกต้อง.' + JSON.stringify(errors),
            isLoggedIn: false
        })
        return;
    }

    //check Session
    if(req.body.remember==='remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
        req.sessionOptions.maxAge = 60000; // อายุ Cookie
    }

    console.log(req.body);
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);

    res.render('user', {
        title : 'ยินดีต้อนรับ' + req.body.email,
        isLoggedIn : true
    });

};

exports.logout = function(req, res){

    //session
    req.session = null;

    res.render('user', {
        title : 'ออกจากระบบ',
        isLoggedIn : false
    });

};
