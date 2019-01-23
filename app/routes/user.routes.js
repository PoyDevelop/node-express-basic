module.exports = function(app){
    var user = require('../controllers/user.controller');
    //app.get('/login', user.render);
    //app.get('/login2', user.render);
    app.post('/login', user.login);
    //app.get('/logout', user.logout);
    //app.route('/user').get(user.list).post(user.create);
    app.get('/user', user.list);
    app.post('/user', user.create);

};