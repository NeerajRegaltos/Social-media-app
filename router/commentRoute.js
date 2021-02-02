const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");


router.get("/", (req, res) => {
    res.redirect("/comment");
})

router.post("/", (req, res) => {
    const postId = req.body.postId;

    Post.findOne({ _id: postId }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            const users = post.comment;
            const commentText = post.commentText;
            res.render("comment", { users, commentText });
        }
    });
})


module.exports = router;
