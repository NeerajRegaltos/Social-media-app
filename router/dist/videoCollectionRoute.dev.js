"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var Post = require("../model/Post");

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Post.find({}).populate("postedBy", "_id username").exec(function (err, posts) {
            if (err) {
              console.log("error in getting user posts", err);
              res.render("home", {
                errorMessage: "Can't Find Post"
              });
            } else {
              // console.log(posts)
              if (posts[0].postedBy._id == req.session.user._id) {
                res.render("videoCollection", {
                  posts: posts,
                  id: req.session.user._id,
                  button: "none"
                });
              } else {
                res.render("videoCollection", {
                  posts: posts,
                  id: req.session.user._id,
                  button: ""
                });
              }
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;