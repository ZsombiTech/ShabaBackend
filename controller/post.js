const jwt = require("jsonwebtoken");
const PostModel = require("../model/Post");

class Post {
  post = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newpost = {
          username: "Ok",
          description: "Szeee",
          imageUrl: "www",
        };
        const post = new PostModel(newpost);
        const savedPost = await post.save();
        res.json({
          message: "Post created...",
          authData,
        });
      }
    });
  };
}

module.exports = Post;
