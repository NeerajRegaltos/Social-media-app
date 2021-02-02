"use strict";

var express = require("express");

var session = require("express-session");

var router = express.Router();
router.get("/", function (req, res) {
  res.render("comment");
});
module.exports = router;