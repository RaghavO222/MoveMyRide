const Req = require('../models/Requests')

const upCar = async(req,res,next) => {
    try{
        const { id, status} = req.body;

        await Req.findByIdAndUpdate(id , {status: status}, { new: true })

        res.status(200).json({
            success: true,
            message: "request updated"
        })

    } catch(error){
        next(error);
    }

}

module.exports = { upCar }