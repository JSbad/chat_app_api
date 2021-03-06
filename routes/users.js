const users = require('express').Router();
const response = require('../models/response.js');
const User = require('../models/user.js');
const Contact = require('../models/contact.js');
const { v1: uuidv1 } = require('uuid');

//Handle creating a user
users.post('/', async (req, res) => {
  const dateCreated = new Date().toLocaleString('en-GB');
  const dateUpdated = dateCreated;
  const userId = uuidv1();

  let bodyValues = [];
  let invalid = false;
  
  User.fillable_properties.map(function (v) {
    if (req.body[v] === null || req.body[v] === undefined)
      invalid = true;
    bodyValues.push(req.body[v]);
  });

  bodyValues = [userId, ...bodyValues, dateUpdated, dateCreated];

  if (!userId) {
    const [results, error] = await User.create(bodyValues);
    if (error.length == 0 && results.affectedRows == 1) {
      res.status(201).json(response.prepare(201, results, error));  
    }
    else
      res.status(400).json(response.prepare(400, results, error));
  } else {
    res.status(400).json(response.prepare(400, [], [{ 'message': 'Missing data' }]));
  }
});

//Handle /users/example_id
users.get('/:id', async(req, res) => {
  const userId = req.params.id;
  const [results, error] = await User.getById(userId);
  
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle users/example_id/contacts
users.get('/:id/contacts', async(req, res) => {
  const userId = req.params.id;
  const [results, error] = await Contact.getByForeignId(userId);

  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

module.exports = users;