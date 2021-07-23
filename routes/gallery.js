const express = require("express");
const fs = require("fs");
const Image = require("../models/image");
const fileUploader = require("../fileHandler");

const router = express.Router();
const upload = fileUploader();

router.get("/", async (req, res) => {
    try{
        const images = await Image.find();
        res.render("index", { images: images });
    }catch(err){
        res.send(err);
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    const { title, description } = req.body;
    const img = fs.readFileSync(req.file.path);
    const encdodedImg = img.toString("base64");

    const image = new Image({
        title: title,
        description: description,
        contentType: req.file.mimetype,
        img: encdodedImg
    });

    try{
        await image.save();
        res.redirect("/");
    }catch(err){
        res.status(404).send(err);
    }
});

router.get("/photo/:id", async (req, res) => {
    const { id } = req.params;
    try{
        image = await Image.findOne({ _id: id });
        res.render("photo", { image: image });
    }catch(err){
        res.send(err);
    }
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try{
        await Image.deleteOne({ _id: id });
        res.redirect("/");
    }catch(err){
        res.send(err);
    }
});

module.exports = router;
