const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

const User = new userController();

router.get("/users:username", User.getUser);

module.exports = router;