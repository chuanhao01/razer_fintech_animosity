// Importing the pg lib to connect to the db
const {v4: uuid} = require('uuid');
const b = require('bcryptjs');

const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.PG_URL,
    max: 5,
});

const model = {
    user: {
        createUser(username, password){
            return new Promise((resolve, reject) => {
                const userId = uuid();
                const passwordHash = b.hashSync(password, 10);
                pool.query(`
                INSERT INTO USERS
                (userId, username, password, points) 
                VALUES
                ($1, $2, $3, $4)
                `, [userId, username, passwordHash, 0], function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res);
                });
            });
        },
        checkPassword(username, password){
            return new Promise((resolve, reject) => {
                pool.query(`
                SELECT * FROM USERS
                WHERE username = $1
                `, [username], function(err, res){
                    if(err){
                        reject(err);
                    }
                    if(res.rowCount === 0 || res.rowCount > 1){
                        reject('NO_USR_FOUND');
                    }
                    resolve(res);
                });
            })
            .then(
                function(res){
                    return b.compareSync(password, res.rows[0].password);
                }
            );
        },
        getUser(username){
            return new Promise((resolve, reject) => {
                pool.query(`
                SELECT * FROM USERS
                WHERE username = $1
                `, [username], function(err, res){
                    if(err){
                        reject(err);
                    }
                    if(res.rowCount !== 1){
                        reject(res);
                    }
                    resolve(res.rows[0]);
                });
            });
        }
    },
    questions: {
        createQuestion(title, description, points, ans){
            return new Promise((resolve, reject) => {
                const questionId = uuid();
                pool.query(`
                INSERT INTO QUESTIONS
                (questionId, title, description, points, ans)
                VALUES
                ($1, $2, $3, $4, $5)
                `, [questionId, title, description, points, ans], function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res);
                });
            });
        },
        getAllQuestions(userId){
            return new Promise((resolve, reject) => {
                pool.query(`
                SELECT q.title, q.questionId, q.description, q.points, coalesce(qa.done, 0) AS "done" FROM
                QUESTIONS q
                LEFT JOIN (
                    SELECT * FROM QUESTIONS_ANS
                    WHERE userId = $1
                ) qa ON q.questionId = qa.questionId
                `, [userId], function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res);
                });
            });
        },
        getQuestion(questionId){
            return new Promise((resolve, reject) => {
                pool.query(`
                SELECT * FROM QUESTIONS
                WHERE questionId = $1 
                `, [questionId], function(err, res){
                    if(err){
                        reject(err);
                    }
                    if(res.rowCount !== 1){
                        reject('Multiple or no question');
                    }
                    resolve(res.rows[0]);
                });
            });
        },
        checkAnswer(questionId, ans){
            return this.getQuestion(questionId)
            .then(
                function(question){
                    return question.ans === ans;
                }
            );
        },
        answerQuestion(questionId, userId){
            return new Promise((resolve, reject) => {
                pool.query(`
                INSERT INTO QUESTIONS_ANS
                (questionId, userId, done)
                VALUES
                ($1, $2, 1)
                `, [questionId, userId], function(err, res){
                    if(err){
                        reject(err);
                    }
                    resolve(res);
                });
            })
            .then(
                function(){
                    return this.getQuestion(questionId);
                }.bind(this)
            )
            .then(
                function(question){
                    return new Promise((resolve, reject) => {
                        pool.query(`
                        UPDATE USERS
                        SET points = points + $1
                        WHERE userId = $2
                        `, [question.points, userId], function(err, res){
                            if(err){
                                reject(err);
                            }
                            resolve(res);
                        });
                    });
                }
            );
        },
        answerBefore(questionId, userId){
            return new Promise((resolve, reject) => {
                pool.query(`
                SELECT * FROM QUESTIONS_ANS
                WHERE (questionId = $1) AND (userId = $2)
                `, [questionId, userId], function(err, res){
                    if(err){
                        reject(err);
                    }
                    if(res.rowCount === 1){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                });
            });
        },
    },
};

module.exports = model;