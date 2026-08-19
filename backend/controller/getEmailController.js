const Car = require("../models/Car")

const getmail = async(req,res,next) => {
    try{

        const {plate} = req.body;

        const mail = await Car.findOne({plate: { $regex: `^${plate}$`, $options: 'i' }})

        if(!mail){
            return res.status(404).json({
                success: false,
                message: "mail not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "mail found",
            mail
          })

    } catch(error){
        next(error);
    }
}

module.exports = {getmail}