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
      console.log(postId);
      var commentText = post.commentText;
      res.render("comment", {
        users: users,
        commentText: commentText,
        id: req.session.user._id,
        postId: postId,
        postedBy: post.posdtedBy
      });
    }
  });
});
router.post("/deletecomment", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Post.findOneAndUpdate({
            _id: req.body.id
          }, {
            $pull: {
              comment: req.body.user
            }
          }, {
            "new": true
          }, function (err, post) {
            if (err) {
              console.log(err);
            } else {
              console.log("User deleted from comment");
              Post.findOneAndUpdate({
                _id: req.body.id
              }, {
                $pull: {
                  commentText: req.body.commentText
                }
              }, {
                "new": true
              }, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("DEleted Comment");
                  res.redirect("/");
                }
              });
            }
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;