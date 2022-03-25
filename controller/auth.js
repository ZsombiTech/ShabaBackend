const jwt = require("jsonwebtoken");
const LoginModel = require("../model/Login");
const TokenModel = require("../model/Tokens");

class Auth {
  register = async (req, res, next) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    LoginModel.find(
      { username: user.username },
      "username",
      async (err, docs) => {
        if (docs.length > 0) {
          console.log("Already exits");
          res.json("Already exits");
        } else {
          const post = new LoginModel(user);
          const savedPost = await post.save();

          jwt.sign({ user }, "secretkey", async (err, token) => {
            const usertoken = new TokenModel({ token });
            const savedtoken = await usertoken.save();
            res.json({ token });
          });
        }
      }
    );
  };

  login = async (req, res, next) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };

    LoginModel.find({ username: user.username }, (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          if (user.password == docs[0].password) {
            console.log("correct");
            jwt.sign({ user }, "secretkey", async (err, token) => {
              const usertoken = new TokenModel({ token });
              const savedtoken = await usertoken.save();
              res.json({
                token,
              });
            });
          } else {
            console.log("incorrect");
          }
        } else {
          console.log("No user with this username");
        }
      } else {
        console.log("failed");
      }
    });
  };
}

module.exports = Auth;
