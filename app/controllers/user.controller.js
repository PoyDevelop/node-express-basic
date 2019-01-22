exports.render = function(req, res){
    res.render('user', {
        'title' : 'NodeJS - MVC!',
        'message' : 'Hello World Jade!'
    });

};
exports.login = function(req, res){
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
