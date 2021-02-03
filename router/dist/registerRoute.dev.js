"use strict";

var express = require("express");

var router = express.Router();

var User = require("../model/User");

var bcrypt = require("bcryptjs");

router.get("/", function (req, res) {
  res.render("register", {
    title: "AmBlogger-Register"
  });
});
router.post("/", function _callee(req, res) {
  var email, username, password, confPassword, errorMessage, user, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email.trim();
          username = req.body.username.trim();
          password = req.body.password;
          confPassword = req.body.confPassword;

          if (!(username && email && password && confPassword)) {
            _context.next = 27;
            break;
          }

          if (!(password.length < 5)) {
            _context.next = 8;
            break;
          }

          errorMessage = "Passwords Length should be more than 5";
          return _context.abrupt("return", res.status(200).render("register", {
            email: email,
            errorMessage: errorMessage,
            title: "AmBlogger-Register"
          }));

        case 8:
          if (!(password !== confPassword)) {
            _context.next = 11;
            break;
          }

          errorMessage = "Passwords Do not match";
          return _context.abrupt("return", res.status(200).render("register", {
            email: email,
            errorMessage: errorMessage,
            title: "AmBlogger-Register"
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(User.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          })["catch"](function (error) {
            console.log(error);
            var errorMessage = "Something went Wrong";
            res.status(200).render("register", {
              username: username,
              email: email,
              errorMessage: errorMessage,
              title: "AmBlogger-Register"
            });
          }));

        case 13:
          user = _context.sent;

          if (!(user === null)) {
            _context.next = 22;
            break;
          }

          data = req.body;
          _context.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 18:
          data.password = _context.sent;
          User.create(data).then(function (user) {
            req.session.user = user;
            return res.redirect("/login");
          });
          _context.next = 25;
          break;

        case 22:
          if (email === user.email) {
            errorMessage = "Email already in use";
          }

          if (username === user.username) {
            errorMessage = "Username Already Exist";
          }

          res.status(200).render("register", {
            errorMessage: errorMessage,
            title: "AmBlogger-Register"
          });

        case 25:
          _context.next = 29;
          break;

        case 27:
          errorMessage = "Make sure each field is filled";
          res.status(200).render("register", {
            username: username,
            email: email,
            errorMessage: errorMessage,
            title: "AmBlogger-Register"
          });

        case 29:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;