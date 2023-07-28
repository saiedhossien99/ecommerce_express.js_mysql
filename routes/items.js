const express = require("express");
const db = require("../db/connection");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/images" });

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No image file uploaded");
    return;
  }

  const image = req.file.filename;
  const { name, price, category, description } = req.body;

  const sql =
    "INSERT INTO products (name, price, category, description,image) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, price, category, description, originalname, mimetype, image],
    (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        res.sendStatus(500);
      } else {
        console.log("Product uploaded successfully");
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
