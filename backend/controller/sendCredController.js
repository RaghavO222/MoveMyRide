const sendEmail = require('../nodemailer/mailer')

const sendCred = async(req,res,next) => {

    try{
        const { email, username, password, role} = req.body;

        const result = await sendEmail(email, username, password, role);

        if (result.success) {
            return res.status(200).json({ msg: "Email sent to:", email });
          } else {
            return res.status(401).json({ error: result.error });
          }
    }catch(error){
        next(error)
    }    

}

module.exports = {sendCred}