const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, plate) => {

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
        subject: "Car Blockage",
        html: `<b>Hello, from MoveMyRide</b><br><p>This mail is to inform you that your car plate number : ${plate}  is blocking another car, so please move your car. </p><br><p>Thank You</p>`
    }

        try{
            await transporter.sendMail(admessage)

            return {
                success: true,
                msg: "Notification mail sent to the email successfully",
                email: email
            };
        }catch(error){
            return {
                success: false,
                error
            };
        }      

}

module.exports = sendEmail;