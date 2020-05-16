const model = require('../model');

const controllers = {
    init(app){
        // Test if the server is up
        app.get('/test', function(req, res){
            res.send('Test recieved');
        });
        // Register users
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
        // Questions
        app.get('/questions', function(req, res){
            return new Promise((resolve) => {
                resolve(
                    model.questions.getAllQuestions(req.user.userId)
                    .catch(
                        function(err){
                            res.status(500).send(err);
                            throw(err);
                        }
                    )
                );
            })
            .then(
                function(pgRes){
                    res.status(200).send({
                        'data': pgRes.rows
                    });
                }
            )
            .catch(
                function(err){
                    return;
                }
            );
        });
        app.post('/question/answer/:questionId', function(req, res){
            const ans = req.body.ans;
            const questionId = req.params.questionId;
            return new Promise((resolve) => {
                resolve(
                    model.questions.checkAnswer(questionId, ans)
                    .catch(
                        function(err){
                            res.status(500).send();
                            throw err;
                        }
                    )
                );
            })
            .then(
                function(isCorrect){
                    return new Promise((resolve, reject) => {
                        if(isCorrect){
                            resolve(true);
                        }
                        else{
                            reject('Wrong ans');
                        }
                    })
                    .catch(
                        function(err){
                            res.status(200).send({
                                'Answer': 'Wrong'
                            });
                            throw err;
                        }
                    );
                }
            )
            .then(
                function(){
                    return model.questions.answerQuestion(questionId, req.user.userId)
                    .catch(
                        function(err){
                            res.status(500).send();
                            throw err;
                        }
                    );
                }
            )
            .then(
                function(){
                    res.status(200).send({
                        'Answer': 'Correct'
                    });
                }
            )
            .catch(
                function(err){
                    return;
                }
            );
        });
    }
};

module.exports = controllers;