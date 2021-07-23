const multer = require("multer");
const fs = require("fs");

const fileUploader = () => {
    const dir = "./images";
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

    const upload = multer({ storage: fileStorageEngine });
    return upload;
}

module.exports = fileUploader;
