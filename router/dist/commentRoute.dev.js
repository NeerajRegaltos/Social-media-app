"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var Post = require("../model/Post");

router.get("/", function (req, res) {
  res.redirect("/comment");
});
router.post("/", function (req, res) {
  var postId = req.body.postId;
  Post.findOne({
    _id: postId
  }, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      var users = post.comment;
      var commentText = post.commentText;
      res.render("comment", {
        users: users,
        commentText: commentText
      });
    }
  });
});
module.exports = router;