const model = require('../model');

const controllers = {
    init(app){
        app.get('/test', function(req, res){
            res.send('Test recieved');
        });
        app.post('/register', function(req, res){
            const username = req.body.username,
            password = req.body.password;
            new Promise((resolve) => {
                resolve(
                    model.user.createUser(username, password)
                    .catch(
                        function(err){
                            res.status(500).send('Error');
                        }
                    )
                );
            })
            .then(
                function(){
                    res.status(200).send();
                }
            );
        });
    }
};

module.exports = controllers;