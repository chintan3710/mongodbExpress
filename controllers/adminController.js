const Student = require("../model/student");

const path = require("path");

const fs = require("fs");

module.exports.add_details = (req, res) => {
    return res.render("add_details");
};

module.exports.viewDetails = async (req, res) => {
    let data = await Student.find({});
    return res.render("view_details", {
        stData: data,
    });
};

module.exports.deleteData = async (req, res) => {
    let oldData = await Student.findById(req.query.id);
    if (oldData.adminImage) {
        let fullPath = path.join(__dirname, ".." + oldData.adminImage);
        await fs.unlinkSync(fullPath);
    }

    await Student.findByIdAndDelete(req.query.id);
    return res.redirect("back");
};

module.exports.updateData = async (req, res) => {
    let data = await Student.findById(req.query.id);
    return res.render("update_details", {
        oldData: data,
    });
};

module.exports.addDetails = async (req, res) => {
    let imagePath = "";
    req.file
        ? (imagePath = Student.imageModelPath + "/" + req.file.filename)
        : false;

    req.body.adminImage = imagePath;

    await Student.create(req.body);
    return res.redirect("back");
};

module.exports.editDetails = async (req, res) => {
    console.log(req.file);

    let oldData = await Student.findById(req.body.oldId);
    if (req.file) {
        if (oldData.adminImage) {
            let fullPath = path.join(__dirname, ".." + oldData.adminImage);
            await fs.unlinkSync(fullPath);
        }
        let imagePath = "";
        imagePath = Student.imageModelPath + "/" + req.file.filename;
        req.body.adminImage = imagePath;
    } else {
        req.body.adminImage = oldData.adminImage;
    }
    await Student.findByIdAndUpdate(req.body.oldId, req.body);
    return res.redirect("/view_details");
};
