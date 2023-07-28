const express = require("express");
const db = require("../db/connection");
const router = express.Router();


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
 