"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var User = require("../model/User");

var Post = require("../model/Post");

router.post("/", function (req, res) {
  var follow = req.body.follow;
  User.findOneAndUpdate({
    username: follow
  }, {
    $push: {
      followers: req.session.user._id
    }
  }, {
    "new": true
  }, function (err, result) {
    if (err) {
      console.log("Error In Following", err);
    } else {
      User.findByIdAndUpdate(req.session.user._id, {
        $push: {
          following: result._id
        }
      }, {
        "new": true
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          Post.find({
            postedBy: req.session.user._id
          }, function (err, posts) {
            if (err) {
              console.log(err);
            } else {
              res.render("profile", {
                profilePic: result.profilePic,
                backgroundPic: result.backgroundPic,
                bio: result.bio,
                profileName: result.username,
                posts: posts,
                following: result.following,
                followers: result.followers
              });
            }
          });
        }
      });
    }
  });
});
module.exports = router;