const jwt = require("jsonwebtoken");
const LoginModel = require("../model/Login");
const PostModel = require("../model/Post");

class User {
  setDesc = async (req, res, next) => {
    console.log("lefut");
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const description = req.body.description;
      const id = req.body.id;
      LoginModel.findByIdAndUpdate(
        id,
        { description: description },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json("success");
          }
        }
      );
    });
  };
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
      const tags = req.body.tags.replace(/\s/g, "");
      const nowhitetags = tags.split(",");

      const postt = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        tags: nowhitetags,
        url: req.body.url,
      };

      const post = new PostModel(postt);
      const savedPost = await post.save();
    });
  };
}

module.exports = User;
