const Req = require("../models/Requests")
const Car = require("../models/Car");

const getReq = async (req, res, next) => {
    try {
        const username = req.user.id;

        const userRequests = await Req.find({ madeBy: username });

        res.status(200).json({
            success: true,
            data: userRequests
        });

    } catch (error) {
        console.error("Error fetching user requests:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const postReq = async (req, res, next) => {
    try {
        const nVal = req.body;

        const carExists = await Car.findOne({ plate: { $regex: new RegExp(`^${nVal.plate}$`, "i") } });
        if (!carExists) {
            return res.status(400).json({
                success: false,
                message: "Plate number not found in Car database"
            });
        }

        const newReq = new Req({
            plate: nVal.plate,
            madeBy: nVal.reqBy,
            date: nVal.date,
            time: nVal.time,
            status: nVal.status || "Pending",
            image: nVal.imageUrl
        });

        const savedReq = await newReq.save();
        console.log("req created")

        res.status(200).json({
            success: true,
            message: "Request created successfully",
            data: savedReq
        });

    } catch (error) {
        console.error("Error posting user requests:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = { getReq, postReq }