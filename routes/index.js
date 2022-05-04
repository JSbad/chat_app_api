const routes = require("express").Router();
const response = require("../models/response.js");
const users = require("./users.js");

//Handle all /users requests in users.js
routes.use("/users", users);

//Handle /
routes.get("/", (req, res) => {
  res.status(200).json(response.prepare(200, [], []));
});

//Handle all other paths
routes.get("*", (req, res) => {
  res
    .status(404)
    .json(response.prepare(404, [], [{ message: "Endpoint not found" }]));
});

module.exports = routes;