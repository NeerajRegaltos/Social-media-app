"use strict";

var express = require("express");

var session = require("express-session");

var User = require("../model/User");

var Post = require("../model/Post");

var router = express.Router();

var _require = require("../cloudinary/index"),
    cloudinary = _require.cloudinary;

router.get("/", function (req, res) {
  var id = req.session.user._id;
  User.findByIdAndDelete(id, function (err, data) {
    if (err) {
      console.log("error in deleting", err);
    } else {
      console.log("Account Deleted");
      Post.find({
        postedBy: id
      }, function (err, posts) {
        if (err) {
          console.log(err);
        } else {
          posts.forEach(function (post) {
            cloudinary.uploader.destroy(post.fileName, {
              resource_type: "raw"
            });
          });
          Post.deleteMany({
            postedBy: id
          }).then(function () {
            console.log("deleted Posts");
            req.session.destroy();
            res.render("login", {
              errorMessage: "Your Account has been Deleted Permanantly"
            });
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    }
  });
});
module.exports = router;