const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    contentType: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const Image = new mongoose.model("Image", imageSchema);
module.exports = Image;
