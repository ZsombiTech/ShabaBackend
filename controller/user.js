const jwt = require("jsonwebtoken");
const LoginModel = require("../model/Login");

class User {
  getUser = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.params.username.substring(1);

      LoginModel.find({ username: username }, (err, docs) => {
        res.json({ docs });
      });
    });
  };
}

module.exports = User;
