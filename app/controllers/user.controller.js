exports.render = function(req, res){
    res.render('user', {
        'title' : 'NodeJS - MVC!',
        'message' : 'Hello World Jade!'
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


    console.log(req.body);
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);

    res.render('user', {
        title : 'ยินดีต้อนรับ' + req.body.email,
        isLoggedIn : true
    });

};

exports.logout = function(req, res){
    res.render('user', {
        title : 'ออกจากระบบ',
        isLoggedIn : false
    });

};
