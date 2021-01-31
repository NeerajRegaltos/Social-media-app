"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var Post = require("../model/Post");

var _require = require("../cloudinary/index"),
    cloudinary = _require.cloudinary;

router.post("/", function (req, res) {
  var postId = req.body.postId;
  Post.findOneAndDelete({
    _id: postId
  }, function (err, deletedItem) {
    if (err) {
      console.log(err);
    } else {
      console.log("Post Deleted");
      cloudinary.uploader.destroy(deletedItem.fileName);
      res.redirect("/");
    }
  });
});
module.exports = router;