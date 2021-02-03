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
            console.log(postId)
            const commentText = post.commentText;
            res.render("comment", { users, commentText, id: req.session.user._id, postId, postedBy: post.posdtedBy });
        }
    });
})

router.post("/deletecomment", async (req, res) => {


    await Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { comment: req.body.user } }, { new: true }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User deleted from comment");
            Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { commentText: req.body.commentText } }, { new: true }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("DEleted Comment");
                    res.redirect("/");
                }
            })
        }
    })

})


module.exports = router;
