const express = require("express");

const routes = express.Router();

const adminContoller = require("../controllers/adminController");

const Student = require("../model/student");

routes.get("/", adminContoller.add_details);

routes.get("/view_details", adminContoller.viewDetails);

routes.get("/deleteData", adminContoller.deleteData);

routes.get("/updateData", adminContoller.updateData);

routes.post("/addDetails", Student.uploadedImage, adminContoller.addDetails);

routes.post("/editDetails", Student.uploadedImage, adminContoller.editDetails);

module.exports = routes;
