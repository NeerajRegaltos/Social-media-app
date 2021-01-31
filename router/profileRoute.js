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
                User.findById({ _id: req.session.user._id }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("profile", { profileName: username, bio, profilePic, backgroundPic, posts, following: result.following, followers: result.followers, display: "none", button: "" });


                    }
                })

            }
        })

});

router.post("/", async (req, res) => {
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
                        User.findById({ _id: req.session.user._id }, (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (posts[0].postedBy._id == req.session.user._id) {
                                    res.render("profile", { posts, backgroundPic: data.backgroundPic, profilePic: data.profilePic, profileName: data.username, bio: data.bio, followers: data.followers, following: data.following, display: "none", button: "" });
                                }else{
                                    res.render("profile", { posts, backgroundPic: data.backgroundPic, profilePic: data.profilePic, profileName: data.username, bio: data.bio, followers: data.followers, following: data.following, display: "", button: "none" });
                                }


                            }
                        })

                    }
                })

        }
    })
})


module.exports = router;
