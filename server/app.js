// Making sure dotenv is working
require('dotenv').config();

// Setting up passports for handling auth
const model = require('./model');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
function(username, password, done){
    new Promise((resolve) => {
        resolve(
            model.user.checkPassword(username, password)
            .catch(
                function(err){
                    done(null, false, {message: 'User does not exists'});
                    throw(err);
                }
            )
        );
    })
    .then(
        function(isUser){
            return new Promise((resolve, reject) => {
                if(isUser){
                    resolve(isUser);
                }
                else{
                    // Wrong password
                    reject('Wrong Password');
                }
            })
            .catch(
                function(err){
                    done(null, false, {message: err});
                    throw(err);
                }
            );
        }
    )
    .then(
        function(){
            return model.user.getUser(username)
            .catch(
                function(err){
                    done(err);
                    throw(err);
                }
            );
        }
    )
    .then(
        function(user){
            done(null, {
                userId: user.userid,
                username: user.username
            });
        }
    )
    .catch(
        function(err){
            return;
        }
    );
}));

// To allow cookie and session usage?
passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

// Setting up express and app
const express = require('express');
const app = express();

// Adding CORS
const cors = require('cors');
app.use(cors());

// Setting up cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Setting up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setting up sessions
const session = require('express-session');
app.use(session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'passport_creds',
    resave: true,
    saveUninitialized: false,
}));

// Init passports on the app
app.use(passport.initialize());
app.use(passport.session());

// Setting up middlewares
const middlewares = require('./middlewares');
middlewares.init(app);

// Setting up the login controller
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/logout',
}), function(req, res){
    res.status(200).send();
});
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('http://localhost:3000');
});

// Setting up controllers
const controllers = require('./controllers/index');
controllers.init(app);

// Setting up ports
const PORT  = 3001;
app.listen(PORT, function(){
    console.log(`Server listening at port ${PORT}`);
});

// Exporting the express app obj for testing purposes
module.exports = app;
