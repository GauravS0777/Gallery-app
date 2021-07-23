const express = require("express");
const mongoose = require("mongoose");
const galleryRouter = require("./routes/gallery");

const app = express();

// connecting to database
mongoose.connect(
    "mongodb://localhost:27017/fileDB", 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if(err)
            console.log(err);
        else
            console.log("Connected to database.");
    }
);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(galleryRouter);

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000.");
});
