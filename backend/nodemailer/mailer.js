const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.eMail,
        pass: process.env.ePass
    }
});


const sendApprovalEmail = (to, car) => {
    const mailOptions = {
        from: process.env.eMail,
        to: to,
        subject: 'Car Blocking',
        text: `Your car with Plate Number: ${car.Plate} is blocking another car. Please move your car`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending email: ', error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = sendApprovalEmail;
