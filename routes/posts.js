const express = require("express");
const router = express.Router();

const postController = require("../controller/post");

const Post = new postController();

router.post("/posts", Post.post);

router.post("/findpost:projectname", Post.findpost);

module.exports = router;
