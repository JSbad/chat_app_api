const users = require("express").Router();
const response = require("../models/response.js");
const User = require("../models/user.js");

//Handle /users/example_id
users.get("/users/:id", async(req, res) => {
  const userId = req.params.id;
  const [results, error] = await User.getById(userId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

//Handle users/example_id/rooms
users.get("/users/:id/rooms", async(req, res) => {
  const userId = req.params.id;
  const [results, error] = await Room.getByForeignId(userId);
  if (results.length != 0 && error.length == 0)
    res.status(200).json(response.prepare(200, results, error));
  else res.status(404).json(response.prepare(404, results, error));
});

module.exports = users;