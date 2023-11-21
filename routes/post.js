const express = require("express");

const routes = express.Router();

const postController = require("../controllers/postController");

const Post = require("../model/post");

routes.get("/", postController.post_details);

routes.post("/postData", Post.uploadedImage, postController.postData);

routes.get("/viewDetails", postController.viewDetails);

routes.get("/deleteData", postController.deleteData);

routes.get("/updateData", postController.updateData);

routes.post("/editDetails",Post.uploadedImage ,postController.editDetails);

module.exports = routes;
