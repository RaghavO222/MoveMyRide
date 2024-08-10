const CarDB = require("../models/carDB")
const mongoose = require('mongoose')
const sendApprovalEmail = require('../nodemailer/mailer');

const getEmail = async (req,res) => {
    const {Plate} = req.params

    try{
        const em = await CarDB.findOne({Plate})

        if(!em){
            return res.status(404).json({ error: 'Car with the specified plate not found' });
        }

        res.status(200).json({email: em.email})
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the email' });
    }
}

const sendEmail= async(req,res) => {
    const {Plate} = req.params

    try{
        const car = await CarDB.findOne({Plate})

        sendApprovalEmail(car.email, Plate);
        res.status(200).json({ message: 'email sent successfully' });
    }catch(error){
        res.status(500).json({ error: 'Error sending email' });
    }

    
}

module.exports = {getEmail,sendEmail}