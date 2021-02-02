"use strict";

var express = require("express");

var mongoose = require("mongoose");

var session = require("express-session");

var path = require("path");

require("dotenv").config();

var requireLogin = require("./middleware/logmiddleware");

var multer = require("multer");

var _require = require("./cloudinary/index"),
    storage = _require.storage;

var upload = multer({
  storage: storage
});
var app = express();
app.use(express["static"](path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views"); //express middleware

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(session({
  secret: "Iloveyoumerikajal",
  resave: true,
  saveUninitialized: false
}));
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
}).then(function () {
  console.log("DB CONNECTED");
  var PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Listening on port ", PORT);
  });
})["catch"](function (err) {
  console.log("DB ERROR-->", err);
}); //Routes

var login = require("./router/loginRoute");

var register = require("./router/registerRoute");

var logout = require("./router/logoutRoute");

var profile = require("./router/profileRoute");

var profilePic = require("./router/profilePicRoute");

var backphoto = require("./router/backgroundPicRoute");

var home = require("./router/homeRoute");

var bio = require("./router/bioRoute");

var settings = require("./router/settingsRoute");

var deleteAccount = require("./router/deleteAccountRoute");

var createPost = require("./router/createPostRoute");

var deletePost = require("./router/deletePostRoute");

var follow = require("./router/followRoute");

var unFollow = require("./router/unFollowRoute");

var like = require("./router/likeRoute");

var unlike = require("./router/unlikeRoute");

var video = require("./router/video");

var videoCollection = require("./router/videoCollectionRoute");

var deleteVideoes = require("./router/deleteVideoes");

var comments = require("./router/commentRoute");

var postComment = require("./router/postCommentRoute");

app.use("/login", login);
app.use("/register", register);
app.use("/logout", logout);
app.use("/profile/:id", requireLogin, profile);
app.use("/profile/follow", requireLogin, profile);
app.use("/", requireLogin, home);
app.use("/bio", requireLogin, bio);
app.use("/settings", requireLogin, settings);
app.use("/deleteAccount", requireLogin, deleteAccount);
app.use("/profilePic", requireLogin, upload.single("image"), profilePic);
app.use("/backphoto", requireLogin, upload.single("image"), backphoto);
app.use("/createPost", requireLogin, upload.single("image"), createPost);
app.use("/deletepost", requireLogin, deletePost);
app.use("/follow", requireLogin, follow);
app.use("/unfollow", requireLogin, unFollow);
app.use("/like", requireLogin, like);
app.use("/unlike", requireLogin, unlike);
app.use("/video", requireLogin, upload.single("video"), video);
app.use("/videocollection", requireLogin, videoCollection);
app.use("/deleteVideoes", requireLogin, deleteVideoes);
app.use("/comment", requireLogin, comments);
app.use("/postcomment", requireLogin, postComment);