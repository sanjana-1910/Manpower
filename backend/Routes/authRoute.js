const express = require("express");
const { register, login } = require("../controllers/authController");

const routes = express.Router();

routes.post("/signup", register);
routes.post("/signin", login);

module.exports = routes;