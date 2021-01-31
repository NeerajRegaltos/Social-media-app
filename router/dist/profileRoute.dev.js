"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var Post = require("../model/Post");

var User = require("../model/User");

router.get("/", function _callee(req, res) {
  var username, bio, profilePic, backgroundPic;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = req.session.user.username;
          bio = req.session.user.bio;
          profilePic = req.session.user.profilePic;
          backgroundPic = req.session.user.backgroundPic;
          Post.find({
            postedBy: req.session.user._id
          }).populate("postedBy", "_id").exec(function (err, posts) {
            if (err) {
              console.log("error in getting user posts", err);
              res.render("profile", {
                errorMessage: "Can't Find Post"
              });
            } else {
              User.findById({
                _id: req.session.user._id
              }, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.render("profile", {
                    profileName: username,
                    bio: bio,
                    profilePic: profilePic,
                    backgroundPic: backgroundPic,
                    posts: posts,
                    following: result.following,
                    followers: result.followers,
                    display: "none",
                    unfollow: "none",
                    button: ""
                  });
                }
              });
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var username;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = req.body.username;
          User.findOne({
            username: username
          }, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              var id = data._id;
              Post.find({
                postedBy: id
              }).populate("postedBy", "_id").exec(function (err, posts) {
                if (err) {
                  console.log("error in getting user posts", err);
                  res.render("profile");
                } else {
                  User.findById({
                    _id: req.session.user._id
                  }, function (err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      if (posts[0].postedBy._id == req.session.user._id) {
                        res.render("profile", {
                          posts: posts,
                          backgroundPic: data.backgroundPic,
                          profilePic: data.profilePic,
                          profileName: data.username,
                          bio: data.bio,
                          followers: data.followers,
                          following: data.following,
                          display: "none",
                          unfollow: "none",
                          button: ""
                        });
                      } else {
                        if (data.followers.includes(req.session.user._id)) {
                          res.render("profile", {
                            posts: posts,
                            backgroundPic: data.backgroundPic,
                            profilePic: data.profilePic,
                            profileName: data.username,
                            bio: data.bio,
                            followers: data.followers,
                            following: data.following,
                            display: "none",
                            unfollow: "",
                            button: "none"
                          });
                        }

                        res.render("profile", {
                          posts: posts,
                          backgroundPic: data.backgroundPic,
                          profilePic: data.profilePic,
                          profileName: data.username,
                          bio: data.bio,
                          followers: data.followers,
                          following: data.following,
                          display: "",
                          unfollow: "none",
                          button: "none"
                        });
                      }
                    }
                  });
                }
              });
            }
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;