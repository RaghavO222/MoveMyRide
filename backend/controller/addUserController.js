const User = require("../models/User.js");
const { addRegistrationValidation } = require("../services/validation_scheme");

const adduser = async (req, res, next) => {
    try {
        const registerValues = await addRegistrationValidation.validateAsync(req.body);
        console.log(registerValues);
        const { username, email, password, role } = registerValues;

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
              role
            });
            await newUser.save();

            return res.status(200).json({
                success: true,
                message: "New User added",
              })
    } catch (error) {
        next(error);
    }
}

module.exports = {adduser};