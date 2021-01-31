"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var Post = require("../model/Post");

router.post("/", function (req, res) {
  var likeID = req.body.like;
  var where = req.body.where;
  var id = req.session.user._id;
  Post.findByIdAndUpdate(likeID, {
    $pull: {
      like: id
    }
  }, {
    "new": true
  }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);

      if (where == "home") {
        res.redirect("/");
      } else {
        res.redirect("/profile/".concat(result.postedBy._id));
      }
    }
  });
});
module.exports = router;