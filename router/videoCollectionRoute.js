const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");



router.get("/", async (req, res) => {
    Post.find({})
        .populate("postedBy", "_id username")
        .exec((err, posts) => {
            if (err) {
                console.log("error in getting user posts", err)
                res.render("home", { errorMessage: "Can't Find Post" });
            } else {
                // console.log(posts)
                if (posts[0].postedBy._id == req.session.user._id) {
                    res.render("videoCollection", { posts, id: req.session.user._id, button: "none" });
                }
                else {
                    res.render("videoCollection", { posts, id: req.session.user._id, button: "" });
                }
            }
        });
});



module.exports = router;