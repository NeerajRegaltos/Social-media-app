const express = require("express");
const session = require("express-session");
const router = express.Router();
const User = require("../model/User");
const Post = require("../model/Post");

router.post("/", (req, res) => {
    const follow = req.body.follow;
    User.findOneAndUpdate({ username: follow }, { $push: { followers: req.session.user._id } }, { new: true }, (err, result) => {
        if (err) {
            console.log("Error In Following", err);
        } else {
            User.findByIdAndUpdate(req.session.user._id, { $push: { following: result._id } }, { new: true }, (err, result2) => {
                if (err) {
                    console.log(err);
                } else {

                    Post.find({ postedBy: req.session.user._id }, (err, posts) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result,result2)
                            res.render("profile", { profilePic: result.profilePic, backgroundPic: result.backgroundPic, bio: result.bio, profileName: result.username, posts, following: result.following, followers: result.followers,button:"none",display:"none",unfollow:"" })
                        }
                    })
                }
            })

        }

    })

})


module.exports = router;