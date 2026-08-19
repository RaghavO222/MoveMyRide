const Req = require("../models/Requests")

const getSpecReq = async (req, res, next) => {
    try {
        const { id } = req.body;

        const userRequest = await Req.findById(id);

        res.status(200).json({
            success: true,
            data: userRequest
        });

    } catch (error) {
        console.error("Error fetching user requests:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = { getSpecReq }