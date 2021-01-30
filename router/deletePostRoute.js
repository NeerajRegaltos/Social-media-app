const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.post("/", (req, res) => {
    const postId = req.body.postId;
    Post.findByIdAndDelete(postId, (err, deletedItem) => {
        if (err) {
            console.log(err);
            res.render("profile", { errorMessage: "Can not Delete This post" })
        } else {
            cloudinary.uploader.destroy(deletedItem.fileName);
            res.redirect("/")
        }
    })
});

module.exports = router;