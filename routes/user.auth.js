const express = require("express");
const db = require("../db/connection");
const router = express.Router();
const jwt=require('jsonwebtoken')
const {check,validationResult}=require('express-validator');

router.get("/test",(req,res)=>{
  return res.send('hellow i am okay')
})

router.post(
  "/login", [
      check("email", "valid email is required").isEmail(),
      
  ],
  (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
          return res.status(400).json({
              error: error.array(),
          });
      }
      let query = `select * from user where email = '${req.body._email}' and password = '${req.body._password}'`;
      
      db.query(query,
          (error, result) => {
              if (error) {
                  console.log(error);
              }
             
              if (result.length > 0) {
                  const payload = {
                      email: result.email,
                      user_name: result.user_name,
                  };

                  jwt.sign(
                      payload,
                      "DIIT18thBatchB&C", {
                          expiresIn: 360000,
                      },
                      (err, token) => {
                          if (err) throw err;
                          return res.status(200).json({
                              token: token,
                          });
                      }
                  );
              } else {
                  return res.status(403).json({
                      message: "Unauthorized access!",
                  });
              }
          }
      );
  }
)

router.post(
  "/register",
  (req, res) => {
    
    let query = `insert into users (id,name, email,password) 
    values('${req.body._name}', '${req.body._email}', ${req.body._password}')`;
    db.query(query, (error, result) => {
      if (error) {
        console.log(error)
        return res.status(400).json({
          message: error.sqlMessage,
        });
      }
      if (result) {
        console.log(result)
        return res.json({
          massage: "successfuly user registered",
        });
      } else {
        return res.status(400).json({
          massage: "unable to create user",
        });
      }
    });
  }
);



module.exports = router;
