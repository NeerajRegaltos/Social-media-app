"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var Post = require("../model/Post");

var _require = require("../cloudinary/index"),
    cloudinary = _require.cloudinary;

router.get("/", function (req, res) {
  Post.find({
    postedBy: req.session.user._id
  }, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("deleteVideoes", {
        posts: posts,
        id: req.session.user._id
      });
    }
  });
});
router.post("/", function (req, res) {
  var fileName = req.body.fileName;
  Post.findOneAndDelete({
    fileName: fileName
  }, function (err, deleted) {
    if (err) {
      console.log(err);
    } else {
      cloudinary.uploader.destroy(fileName, {
        resource_type: "raw"
      });
      console.log("Deleted video successfully");
      res.redirect("/deleteVideoes");
    }
  });
});
module.exports = router;