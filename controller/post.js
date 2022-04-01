const jwt = require("jsonwebtoken");
const PostModel = require("../model/Post");

class Post {
  post = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        let dataa;

        PostModel.find({}, (err, docs) => {
          console.log(docs);
          dataa = docs;

          const newpost = {
            response: "Good",
            data: dataa,
          };

          res.json(newpost);
        });
      }
    });
  };
  findpost = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const projectname = req.params.projectname.substring(1);

      PostModel.find({ description: projectname }, (err, docs) => {
        res.json(docs);
      });
    });
  };
}

module.exports = Post;
