const User = require("../models/User.js");
const { loginValidation } = require("../services/validation_scheme");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const loginUser = async (req, res, next) => {
    try {
      const registerValues = await loginValidation.validateAsync(req.body);
      const { username, password } = registerValues;
  
      const userVerification = await User.findOne({
        username,
      });
  
      if (!userVerification) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      console.log(userVerification)
  
      if (userVerification.password === password) {
  
  
        const token = jwt.sign( { id: userVerification.username } ,
          process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TIMEOUT,
        });
  
        console.log(token);
  
        return res.status(200).json({
          success: true,
          message: "Login",
          token,
          userVerification
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
  
    } catch (error) {
      next(error);
    }
  };

  module.exports = {loginUser}