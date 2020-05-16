require('dotenv').config();

const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.PG_URL,
    max: 5,
});

// const init = `
// DROP TABLE IF EXISTS USERS, QUESTIONS, QUESTIONS_ANS;

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

// CREATE TABLE IF NOT EXISTS QUESTIONS_ANS(
//     questionId VARCHAR(255) NOT NULL,
//     userId VARCHAR(255) NOT NULL,
//     done INT NOT NULL,
//     PRIMARY KEY(questionId, userId),
//     FOREIGN KEY (questionId) REFERENCES QUESTIONS(questionId),
//     FOREIGN KEY (userId) REFERENCES USERS(userId)
// );
// `;

// pool.query(init)
// .then((res) => console.log(res.rows))
// .catch((err) => console.log(err));

const model = require('./model');
// model.user.createUser('abc', 'abc')
// .then((res) => console.log(res.rows))
// .catch((err) => console.log(err));

// model.user.checkPassword('test user 1', 'no')
// .then((isUser) => console.log(isUser))
// .catch((err) => console.log(err));
let a = [
    {
        question: 'What should you do to get a full detailed picture of your finacial spending for the entire month',
        ans: 'To track where you are spending you money'
    },
    {
        question: 'How many months of expenses should you at least have, in case of an emergency',
        ans: '3 Months'
    },
    {
        question: 'What step should you complete before buying into a finacial plan.',
        ans: 'Know your money priorities'
    },
    {
        question: 'What rule holds true regardless of your current priority?',
        ans: 'Save Early and Often'
    },
    {
        question: 'Name three best side hustles mentioned in the article',
        ans: 'Blogging, Online Surveys, Becoming a virtual asasistant'
    },
];

let b = [
    {
        question: 'What is the recommended way of managing debts according to the article',
        ans: 'By paying of the debt with the highest interest rate.'
    },
    {
        question: 'What should you get no matter what stage of life you are in',
        ans: 'Life Insurance'
    },
    {
        question: 'What is one of the best money management tips related to getting a credit card',
        ans: 'Get a credit card with rewards'
    },
    {
        question: 'What should you do to avoid impulsive purchases?',
        ans: 'Wait at least 24 hours and then decide if you still want it'
    },
    {
        question: 'What are some of the most dependable classes to invest in?',
        ans: 'Stocks, bonds, Real estate'
    }
];

// for(let i=0; i<a.length; i++){
//     model.questions.createQuestion(`Topic 1 Question ${i+1}`, a[i].question, 1000, a[i].ans);
// }

// for(let i=0; i<b.length; i++){
//     model.questions.createQuestion(`Topic 2 Question ${i+1}`, b[i].question, 1000, b[i].ans);
// }


model.questions.getAllQuestions('1d9556a5-dbd5-4a73-86f5-a22c1aaa87c3')
.then((res) => console.log(res.rows));
