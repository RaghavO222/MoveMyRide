const sendEmail = require('../nodemailer/notmailer')

const sendNoti = async(req,res,next) => {

    try{
        const { email, plate} = req.body;

        const result = await sendEmail(email, plate);

        if (result.success) {
            return res.status(200).json({ msg: "Email sent to:", email,success: true });
          } else {
            return res.status(401).json({ error: result.error });
          }
    }catch(error){
        next(error)
    }    

}

module.exports = {sendNoti}