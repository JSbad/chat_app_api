const login = require('express').Router();
const response = require('../models/response.js');
const User = require('../models/user.js');
const md5 = require('md5');


login.post('/', async (req, res) => {
    var reqUser = req.body.username;
    var reqPass = req.body.password;
    if (req.body != null && reqUser != null && reqPass != null) {
        const [results, error] = await User.getBy("username", reqUser);
        let hashedPassword = md5(reqPass);
        if ((results.length != 0 && error.length == 0) && (results[0].password == hashedPassword)) {
            res.status(400).json(response.prepare(400, "Logged in", ""))
        } else { res.status(401).json(response.prepare(401, "", "Wrong username or password")) };
    } else { res.status(401).json(response.prepare(401, "", "Wrong username or password")) };
});

login.get('/logout', async (req, res) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    
});

module.exports = login;