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
  likepost = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const projectname = req.params.projectname.substring(1);
      const id = req.body.id;
      const clicked = req.body.clicked;
      const first = req.body.first;

      let add = 0;
      if (clicked) {
        add = 1;
      } else if (!first) {
        add = -1;
      }

      PostModel.find({ _id: id }, "likes", (err, docs) => {
        PostModel.findByIdAndUpdate(
          id,
          { likes: docs[0].likes + add },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
              console.log(clicked);
              console.log(add);
              res.json("success");
            }
          }
        );
      });
    });
  };
}

module.exports = Post;
