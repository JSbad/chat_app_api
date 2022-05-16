const login = require('express').Router();
const session = require('express-session');
const response = require('../models/response.js');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const User = require('../models/user.js');

login.use(session({secret: 'testSecret',
                   store: new redisStore({host: 'localhost', port: 6379, client:client, ttl: 600}),
                   saveUninitialized: false,
                    resave: false
}));


login.post('/login', async(req, res) => {
    let reqUser = req.body.username;
    let reqPass = req.body.password;
    if(reqUser && reqPass) {
        const [results, error] = await User.getBy(username, reqUser);
        if(results.length != 0 && error.length == 0) {
            const [results, error] = await User.getBy(password, reqPass);
            if(results.length != 0 && error.length == 0) {
                res.status(200).json(response.prepare(200, results, error));
            } else {res.status(403).json(response.prepare(403, results, error))};
        } else {res.status(401).json(response.prepare(401, results, error))};

    }
    req.session.username = req.body.username;
    res.end('done');
})

login.get('/logout', async(req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = login;