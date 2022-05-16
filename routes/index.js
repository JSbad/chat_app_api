const routes = require('express').Router();
const response = require('../models/response.js');
const users = require('./users.js');
const login = require('./login.js');

//Handle all /users requests in users.js
routes.use('/users', users);

routes.use('/login', login);

//Handle /
routes.get('/', (req, res) => {
  let sess = req.session;
    if (sess.user) {
      return res.redirect('/:id');
    } else {
        res.status(200).json(response.prepare(200, [], []));
      }
});

//Handle all other paths
routes.get('*', (req, res) => {
  res
    .status(404)
    .json(response.prepare(404, [], [{ message: 'Endpoint not found' }]));
});

module.exports = routes;