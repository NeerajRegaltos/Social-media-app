const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const User = require("../model/User");


router.get("/", async (req, res) => {

    const username = req.session.user.username;
    const bio = req.session.user.bio;
    const profilePic = req.session.user.profilePic;
    const backgroundPic = req.session.user.backgroundPic;


    Post.find({ postedBy: req.session.user._id })
        .populate("postedBy", "_id")
        .exec((err, posts) => {
            if (err) {
                console.log("error in getting user posts", err)
                res.render("profile", { errorMessage: "Can't Find Post" });
            } else {
                
                res.render("profile", { profileName: username, bio, profilePic, backgroundPic, posts });
            }
        })

});

router.post("/", (req, res) => {
    const username = req.body.username;
    User.findOne({ username }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const id = data._id;
            Post.find({ postedBy: id })
                .populate("postedBy", "_id")
                .exec((err, posts) => {
                    if (err) {
                        console.log("error in getting user posts", err)
                        res.render("profile");
                    } else {
                        res.render("profile", { profilePic: data.profilePic, backgroundPic: data.backgroundPic, bio: data.bio, profileName: data.username, posts })
                    }
                })

        }
    })
})


module.exports = router;
