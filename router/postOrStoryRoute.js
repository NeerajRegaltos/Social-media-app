const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("postorstory",{id:req.session.user._id});
});


module.exports = router;