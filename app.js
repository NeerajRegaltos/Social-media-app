const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const requireLogin = require("./middleware/logmiddleware");
const multer = require("multer");
const { storage } = require("./cloudinary/index");
const upload = multer({ storage });


const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

//express middleware
app.use(express.urlencoded({ extended: false }));
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
})
    .then(() => {
        console.log("DB CONNECTED");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("Listening on port ", PORT);
        });
    })
    .catch(err => {
        console.log("DB ERROR-->", err);
    });


//Routes
const login = require("./router/loginRoute");
const register = require("./router/registerRoute");
const logout = require("./router/logoutRoute");
const profile = require("./router/profileRoute");
const profilePic = require("./router/profilePicRoute");
const backphoto = require("./router/backgroundPicRoute");
const home = require("./router/homeRoute");
const bio = require("./router/bioRoute");
const settings = require("./router/settingsRoute");
const deleteAccount = require("./router/deleteAccountRoute");
const createPost = require("./router/createPostRoute");
const deletePost = require("./router/deletePostRoute");
const follow = require("./router/followRoute");
const unFollow = require("./router/unFollowRoute");


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
 