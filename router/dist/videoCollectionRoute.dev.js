"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var Post = require("../model/Post");

var User = require("../model/User");

router.get("/", function (req, res) {
  res.redirect("/videocollection");
});
router.post("/", function _callee(req, res) {
  var username;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = req.body.username;
          User.findOne({
            username: username
          }, function (err, user) {
            if (err) {
              console.log(err);
            } else {
              Post.find({
                postedBy: user._id
              }, function (err, posts) {
                if (err) {
                  console.log(err);
                } else {
                  res.render("videoCollection", {
                    posts: posts,
                    id: req.session.user._id,
                    user_id: posts[0].postedBy
                  });
                }
              });
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;