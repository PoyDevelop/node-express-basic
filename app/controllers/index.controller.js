exports.render = function(req, res){
    //console.log(process.env.NODE_ENV);
    //res.send('Hello World');

    res.render('index', {
        'title' : 'NodeJS - MVC!',
        'message' : 'Hello World Jade!'
    });

};