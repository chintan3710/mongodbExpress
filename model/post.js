const mongoose = require("mongoose");

const path = require("path");

const multer = require("multer");

const imagePath = "/uploads/postImage";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postImage: {
        type: String,
        required: true,
    },
});

const imagestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, ".." , imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

postSchema.statics.uploadedImage = multer({ storage: imagestorage }).single(
    "postImage"
);

postSchema.statics.imageModelPath = imagePath;

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
