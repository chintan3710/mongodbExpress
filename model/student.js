const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");

const imagePath = "/uploads";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    adminImage: {
        type: String,
        required: true,
    },
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

studentSchema.statics.uploadedImage = multer({ storage: imageStorage }).single(
    "adminImage"
);

studentSchema.statics.imageModelPath = imagePath;

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
