const express = require("express");
const session = require("express-session");
const User = require("../model/User");
const router = express.Router();

router.get("/", (req, res) => {

    User.findByIdAndDelete(req.session.user._id, (err, data) => {
        if (err) {
            console.log("error in deleting", err)
        } else {
            console.log("Account Deleted");
            req.session.destroy();
            res.render("login", { errorMessage: "Your Account has been Deleted Permanantly" });
        }
    })
});

module.exports = router;