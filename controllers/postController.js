const Post = require("../model/post");

const path = require("path");

const fs = require("fs");

module.exports.post_details = (req, res) => {
    return res.render("add_post_details");
};

module.exports.postData = async (req, res) => {
    let imagePath = "";
    req.file
        ? (imagePath = Post.imageModelPath + "/" + req.file.filename)
        : false;

    req.body.postImage = imagePath;
    await Post.create(req.body);
    return res.redirect("back");
};

module.exports.viewDetails = async (req, res) => {
    let data = await Post.find({});
    return res.render("view_post_details", {
        postData: data,
    });
};

module.exports.deleteData = async (req, res) => {
    try {
        let oldData = await Post.findById(req.query.id);
        if (oldData) {
            let oldImage = oldData.postImage;
            if (oldImage) {
                let fullPath = path.join(__dirname, ".." + oldData.postImage);
                let deletedImage = await fs.unlinkSync(fullPath);

                let deleteRecord = await Post.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("Record & Image deleted successfully");
                    return res.redirect("back");
                } else {
                    console.log("Record deleted successfully");
                    return res.redirect("back");
                }
            } else {
                let deleteRecord = await Post.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("Record deleted successfully");
                    return res.redirect("back");
                } else {
                    console.log("Record deleted successfully");
                    return res.redirect("back");
                }
            }
        } else {
            console.log("Record not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.updateData = async (req, res) => {
    try {
        let oldData = await Post.findById(req.query.id);
        if (oldData) {
            return res.render("update_post", {
                singlePost: oldData,
            });
        } else {
            console.log("record not found");
            return res.redirect(" back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.editDetails = async (req, res) => {
    try {
        let oldData = await Post.findById(req.body.oldId);
        if (req.file) {
            if (oldData.postImage) {
                let fullPath = path.join(__dirname, ".." + oldData.postImage);
                await fs.unlinkSync(fullPath);
            }
            let imagePath = "";
            imagePath = Post.imageModelPath + "/" + req.file.filename;
            req.body.postImage = imagePath;
        } else {
            req.body.postImage = oldData.postImage;
        }
        await Post.findByIdAndUpdate(req.body.oldId, req.body);
        return res.redirect("/post/viewDetails");
    } catch (err) {
        console.log(err);
        return res.redirect("/post/viewDetails");
    }
};
