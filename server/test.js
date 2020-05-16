require('dotenv').config();

// const {Pool} = require('pg');
// const pool = new Pool({
//     connectionString: process.env.PG_URL,
//     max: 5,
// });

// const init = `
// DROP TABLE IF EXISTS USERS, QUESTIONS;

// CREATE TABLE IF NOT EXISTS USERS(
//     userId VARCHAR(255) NOT NULL,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     points INT NOT NULL,
//     PRIMARY KEY(userId)
// );

// CREATE TABLE IF NOT EXISTS QUESTIONS(
//     questionId VARCHAR(255) NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     description VARCHAR(255) NOT NULL,
//     points INT NOT NULL,
//     ans VARCHAR(255) NOT NULL,
//     PRIMARY KEY(questionId)
// );
// `;

// pool.query(init)
// .then((res) => console.log(res.rows))
// .catch((err) => console.log(err));

const model = require('./model');
// model.user.createUser('test user 1', 'abc')
// .then((res) => console.log(res.rows))
// .catch((err) => console.log(err));

model.user.checkPassword('test user 1', 'no')
.then((isUser) => console.log(isUser))
.catch((err) => console.log(err));