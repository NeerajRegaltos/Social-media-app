"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  profilePic: {
    type: String,
    "default": "https://res.cloudinary.com/instagram-clone-images/image/upload/v1612110200/sumkxhi1z6qiuvvmrdzw.png"
  },
  backgroundPic: {
    type: String,
    "default": "https://res.cloudinary.com/instagram-clone-images/image/upload/v1611913844/fqu2aev42swomn1cuc85.jpg"
  },
  imgFileName: {
    type: String
  },
  backImgFileName: {
    type: String
  },
  bio: {
    type: String,
    "default": "No Bio Available",
    trim: true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});
var User = mongoose.model("User", userSchema);
module.exports = User;