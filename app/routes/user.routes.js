module.exports = function(app){
    var user = require('../controllers/user.controller');
    app.get('/login', user.render);
    app.get('/login2', user.render);
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    //app.route('/login').get(user.render).post(user.login);
;}