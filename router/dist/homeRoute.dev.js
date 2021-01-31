"use strict";

var express = require("express");

var router = express.Router();

var session = require("express-session");

var Post = require("../model/Post");

var User = require("../model/User");

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Post.find({}).populate("postedBy", "_id username").exec(function (err, posts) {
            if (err) {
              console.log("error in getting user posts", err);
              res.render("home", {
                errorMessage: "Can't Find Post"
              });
            } else {
              // console.log(posts)
              res.render("home", {
                posts: posts,
                id: req.session.user._id
              });
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // router.post("/home/search",(req,res)=>{
//     const search = req.body.search;
//     User.find({},(err,users)=>{
//         if(err){
//             console.log("Error in searching user",err);
//         }else{
//             res.render("search",{users});
//         }
//     })
// })

module.exports = router;