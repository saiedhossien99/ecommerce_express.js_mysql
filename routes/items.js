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

router.get('/items',(err,res)=>{
   const sql="select * from products";
   db.query(sql,(err,result)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(result);
    }
   });
});

router.get('/electronic',(err,res)=>{
  const sql="select * from products where caragory='electronic' ";
  db.query(sql,(err,result)=>{
   if(err){
     console.log(err);
     res.sendStatus(500);
   }else{
     res.send(result);
   }
  });
});

router.get('/groceries',(err,res)=>{
  const sql="select * from products where caragory='groceries' ";
  db.query(sql,(err,result)=>{
   if(err){
     console.log(err);
     res.sendStatus(500);
   }else{
     res.send(result);
   }
  });
});

router.get('/fashion',(err,res)=>{
  const sql="select * from products where caragory='fashoin' ";
  db.query(sql,(err,result)=>{
   if(err){
     console.log(err);
     res.sendStatus(500);
   }else{
     res.send(result);
   }
  });
});



module.exports = router;
