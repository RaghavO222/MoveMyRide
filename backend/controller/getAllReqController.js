const Req = require("../models/Requests")

const getAllReq = async(req,res,next) => {
    try{
        const requests = await Req.find();
        res.status(200).json({
            success: true,
            data: requests
        });


    }catch(error){
        console.error("Error fetching requests:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = {getAllReq}