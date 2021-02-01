"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var _require = require("../cloudinary/index"),
    cloudinary = _require.cloudinary;

var Post = require("../model/Post");

router.get("/", function (req, res) {
  res.render("video", {
    id: req.session.user._id
  });
});
router.post("/", function (req, res) {
  var fileName = req.file.filename;
  var caption = req.body.caption;
  var video = req.file.path;
  var data = {
    video: video,
    caption: caption,
    fileName: fileName,
    postedBy: req.session.user
  };
  Post.create(data).then(function (posts) {
    console.log("Video Posted");
    res.render("video", {
      message: "Video has Posted",
      id: req.session.user._id
    });
  })["catch"](function (err) {
    console.log("error in posting video", err);
    res.render("video", {
      errorMessage: "Video Could not post",
      id: req.session.user._id
    });
  });
});
module.exports = router;