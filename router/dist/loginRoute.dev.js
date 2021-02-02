"use strict";

var express = require("express");

var router = express.Router();

var User = require("../model/User");

var bcrypt = require("bcryptjs");

router.get("/", function (req, res) {
  res.render("login", {
    title: "AmBlogger-Login"
  });
});
router.post("/", function _callee(req, res) {
  var email, username, password, user, result, errorMessage;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email.toLowerCase().trim();
          username = req.body.email.trim();
          password = req.body.password;

          if (!(email && password)) {
            _context.next = 16;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          })["catch"](function (error) {
            console.log(error);
            var errorMessage = "Something Went Wrong.";
            res.render("login", {
              errorMessage: errorMessage,
              email: email,
              username: username,
              title: "AmBlogger-Login"
            });
          }));

        case 6:
          user = _context.sent;

          if (!(user !== null)) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 10:
          result = _context.sent;

          if (!(result === true)) {
            _context.next = 14;
            break;
          }

          //correct password
          req.session.user = user;
          return _context.abrupt("return", res.redirect("/"));

        case 14:
          errorMessage = "Credentials incorrect.";
          return _context.abrupt("return", res.render("login", {
            errorMessage: errorMessage,
            title: "AmBlogger-Login"
          }));

        case 16:
          errorMessage = "Make sure each field has correct values.";
          return _context.abrupt("return", res.render("login", {
            errorMessage: errorMessage,
            title: "AmBlogger-Login"
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;