const Car = require("../models/Car")

const addCar = async (req, res, next) => {
    try {

        const { email, plate } = req.body;

        const emailExists = await Car.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "A car with this email already exists",
            });
        }

        const plateExists = await Car.findOne({ plate });
        if (plateExists) {
            return res.status(400).json({
                success: false,
                message: "A car with this plate number already exists",
            });
        }

        const newCar = new Car({ email, plate });
        await newCar.save();

        res.status(200).json({
            success: true,
            message: "Car added successfully",
            car: newCar,
        });


    } catch (error) {
        console.error("Error adding car:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = {addCar}