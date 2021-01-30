const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../model/User");
const { cloudinary } = require("../cloudinary/index");


router.get("/", async (req, res) => {
    res.render("profilePic", { id: req.session.user._id });
});


router.post("/", (req, res) => {
    const profilePic = req.file.path;
    const fileName = req.file.filename;

    const prevFileName = req.session.user.imgFileName;
    const id = req.session.user._id;


    User.findByIdAndUpdate(req.session.user._id, { profilePic, imgFileName: fileName }, { new: true }, (err, data) => {
        if (err) {
            console.log(err)
            return res.render("profilePic", { errorMessage: "Couldn't update Photo", id });
        } else {
            console.log("Updated User Profile Pic");
            req.session.user = data;
            cloudinary.uploader.destroy(prevFileName);
            res.render("profilePic", { message: "Profile Pic Successfully Updated", id });
        }
    })
});

module.exports = router;