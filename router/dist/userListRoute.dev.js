"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var User = require("../model/User");

router.get("/", function (req, res) {
  User.findOne({
    _id: req.session.user._id
  }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      var username = user.username;
      User.find({}, function (err, users) {
        if (err) {
          console.log(err);
        } else {
          res.render("userList", {
            users: users,
            username: username,
            id: req.session.user._id,
            show: "",
            notShow: "none"
          });
        }
      });
    }
  });
});
module.exports = router;