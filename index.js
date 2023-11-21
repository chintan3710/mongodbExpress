const express = require("express");

const path = require("path");

const fs = require("fs");

// const db = require("./config/mongoose");

const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://chintanrajpara34:Chintan2.2@cluster0.xbpi35j.mongodb.net/Firstdb",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Database connected."))
    .catch((err) => console.log(err));

const Student = require("./model/student");

const port = 8002;

const app = express();

app.use(express.urlencoded());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes"));

app.use("/post", require("./routes/post"));

app.listen(port, (err) => {
    err
        ? console.log("Server not responding")
        : console.log(`Server respond successfully at port ${port}`);
});
