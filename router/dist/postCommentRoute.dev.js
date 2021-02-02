"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var Post = require("../model/Post");

var User = require("../model/User");

router.get("/", function (req, res) {
  res.redirect("/");
});
router.post("/", function (req, res) {
  var postId = req.body.postId;
  var comments = req.body.comment;

  if (comments.trim().length == 0) {
    res.redirect("/postcomment");
    return;
  }

  User.findOne({
    _id: req.session.user._id
  }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      var username = user.username;
      Post.findOneAndUpdate({
        _id: postId
      }, {
        $push: {
          comment: username
        }
      }, {
        "new": true
      }, function (err, post) {
        if (err) {
          console.log(err);
        } else {
          Post.findOneAndUpdate({
            _id: postId
          }, {
            $push: {
              commentText: comments
            }
          }, {
            "new": true
          }, function (err, posts) {
            if (err) {
              console.log(err);
            } else {
              console.log(posts);
              res.redirect("/postcomment");
            }
          });
        }
      });
    }
  });
});
module.exports = router;