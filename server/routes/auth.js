
const express = require('express');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Middleware = require('../middleware/middleware');
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.json({
        success: false,
        message: "User already registered"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newuser = await user.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in server"
    });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existinguser = await user.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }

    // Verify password
    const checkpassword = await bcrypt.compare(password, existinguser.password);
    if (!checkpassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existinguser._id }, "secretkey", {
      expiresIn: "9h",
    });

    // Respond with success
    return res.status(200).json({
      success: true,
      token,
      user: { name: existinguser.name },
      message: "Login successfully",
    });
  } catch (error) {
    console.error("Error in login server:", error);
    return res.status(500).json({
      success: false,
      message: "Error in login server",
    });
  }
});
router.get('/verify',Middleware,async(req,res)=>{
return res.status(200).jsoon({success:true})
})
module.exports = router;

// import express from 'express';
// import bcrypt from 'bcrypt';
// import user from '../models/user.js'; // Ensure the file extension is added for ES Modules

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     let existinguser = await user.findOne({ email });
//     if (existinguser) {
//       return res.json({
//         success: false,
//         message: "user already registered"
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     let newuser = await user.create({
//       name: name,
//       email: email,
//       password: hashedPassword
//     });

//     return res.status(200).json({
//       succes: true,
//       message: "user created successfully"
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error in server"
//     });
//   }
// });

// export default router;





































































