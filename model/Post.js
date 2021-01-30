const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    photo: {
        type: String,
    },
    photoName: {
        type: String
    },
    caption: {
        type: String,
        trim: true
    },
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileName: {    //Post File Name
        type: String
    }



}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;