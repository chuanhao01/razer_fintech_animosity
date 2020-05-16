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
};

module.exports = model;