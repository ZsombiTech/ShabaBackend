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
  ownposts = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.params.username.substring(1);

      PostModel.find({ username: username }, (err, docs) => {
        res.json(docs);
      });
    });
  };
  deletepost = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const id = req.body.id;
      console.log(id);
      PostModel.findByIdAndRemove(id, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.json("success");
        }
      });
    });
  };
  likepost = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const id = req.body.id;
      const clicked = req.body.clicked;
      const first = req.body.first;
      const username = req.body.username;
      const numm = req.body.numm;

      let add = 0;

      if (!first) {
        if (clicked) {
          add = 1;
        } else {
          add = -1;
        }
      }

      PostModel.find({ _id: id }, "likes likedBy", (err, docs) => {
        PostModel.findByIdAndUpdate(
          id,
          { likes: docs[0].likes + add },
          function (err, docss) {
            if (err) {
              console.log(err);
            } else {
              if (add == 1) {
                let exits = false;

                docs[0].likedBy.map((item) => {
                  if (item == username) {
                    exits = true;
                  }
                });

                if (!exits) {
                  PostModel.findByIdAndUpdate(
                    id,
                    {
                      $push: { likedBy: username },
                    },
                    function (error, success) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("success add");
                      }
                    }
                  );
                }
              }
              if (add == -1) {
                PostModel.findByIdAndUpdate(
                  id,
                  {
                    $pull: { likedBy: username },
                  },
                  function (error, success) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("success add");
                    }
                  }
                );
              }
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
