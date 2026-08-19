const User = require("../models/User.js");
const { registrationValidation } = require("../services/validation_scheme");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../services/googleClient');
require("dotenv").config();


const signupUser = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    const { username, email, password } = registerValues;

    const userVerification = await User.findOne({
      username,
    });
    const userEmail = await User.findOne({
      email,
    });


    if (userVerification) {
      return res.status(200).json({
        success: false,
        message: "User Exist already",
      });
    }
    if (userEmail) {
      return res.status(409).json({
        success: false,
        message: "User Email exists",
      });
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    console.log(token);

    return res.status(200).json({
      success: true,
      message: "Login",
      token,
      userVerification
    });
  } catch (error) {
    next(error);
  }
};

const googleUser = async (req, res, next) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: "Authorization code is missing" });
    }

    console.log("Google Auth Code:", code);

    // Exchange code for tokens
    let googleRes;
    try {
      googleRes = await oauth2Client.getToken(code);
    } catch (error) {
      console.error("Google OAuth Error:", error.response?.data || error.message);
      return res.status(500).json({ message: "Failed to retrieve Google token" });
    }

    oauth2Client.setCredentials(googleRes.tokens);

    // Fetch user info from Google
    let userRes;
    try {
      userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );
    } catch (error) {
      console.error("Google User Info Error:", error.response?.data || error.message);
      return res.status(500).json({ message: "Failed to fetch Google user info" });
    }

    console.log("Google User Data:", userRes.data);
    const { email, name, picture } = userRes.data;

    if (!email) {
      return res.status(500).json({ message: "Invalid user data from Google" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      try {
        user = await User.create({
          name,
          email,
          image: picture,
        });
      } catch (error) {
        console.error("Database Error:", error.message);
        return res.status(500).json({ message: "User creation failed" });
      }
    }

    const { _id } = user;

    if (!_id || !email) {
      return res.status(500).json({ message: "Invalid user data" });
    }

    const token = jwt.sign({ _id, email },
      "sehjbfliwehbfliweubfweiubfi", {
        expiresIn: "1m",
    });

    res.status(200).json({
      message: 'success',
      token,
      user,
    });

  } catch (err) {
    console.error("Internal Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { signupUser, googleUser };