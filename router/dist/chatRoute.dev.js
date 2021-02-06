"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();

var User = require("../model/User");

router.get("/", function (req, res) {
  var id = req.session.user._id;
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      User.findOne({
        _id: id
      }, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          var name = user.username;
          console.log(name);
          res.render("chat", {
            users: users,
            name: name
          });
        }
      });
    }
  });
});
module.exports = router;