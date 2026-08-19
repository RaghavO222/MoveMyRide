const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, username, password, role) => {

    let config = {
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    }

    let transporter = nodemailer.createTransport(config);

    let admessage = {
        from: process.env.USER,
        to: email,
        subject: "Your credentials",
        html: `<b>Hello, Welcome to MoveMyRide</b><br><p>Your credentials for admin login are :</p><br><p>Username : ${username}</p><br><p>Password : ${password}</p>`
    }

    let umessage = {
        from: process.env.USER,
        to: email,
        subject: "Your credentials",
        html: `<b>Hello, Welcome to MoveMyRide</b><br><p>Your credentials for user login are :</p><br><p>Username : ${username}</p><br><p>Password : ${password}</p>`
    }

    if(role == "user"){
        try{
            await transporter.sendMail(umessage)

            return {
                success: true,
                msg: "Credentials sent to the email successfully",
                email: email
            };
        }catch(error){
            return {
                success: false,
                error
            };
        }        
        
    } else if(role == "admin"){
        try{
            await transporter.sendMail(admessage)

            return {
                success: true,
                msg: "Credentials sent to the email successfully",
                email: email
            };
        }catch(error){
            return {
                success: false,
                error
            };
        }  
    }

    

}

module.exports = sendEmail;