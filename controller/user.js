const jwt = require("jsonwebtoken");
const LoginModel = require("../model/Login");
const PostModel = require("../model/Post");

class User {
  getUser = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.params.username.substring(1);

      LoginModel.find({ username: username }, (err, docs) => {
        res.json({ docs });
      });
    });
  };
  postUser = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const postt = {
        username: req.body.username,
        description: req.body.description,
        tags: req.body.tags,
      };

      const post = new PostModel(postt);
      const savedPost = await post.save();
    });
  };
}

module.exports = User;
