"use strict";

var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  photo: {
    type: String
  },
  photoName: {
    type: String
  },
  caption: {
    type: String,
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  fileName: {
    //Post File Name
    type: String
  },
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  video: String,
  comment: [{
    type: String
  }],
  commentText: [{
    type: String
  }]
}, {
  timestamps: true
});
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;