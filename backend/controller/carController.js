const Car = require('../models/carModel')
const mongoose = require('mongoose')

const getCars = async (req,res) => {
    const user_id = req.user._id;
    const tp = req.user.type;
    let cars;

    if (tp === "admin") {
        cars = await Car.find().sort({ createdAt: -1 }).populate('user_id', 'email');
    } else {
        cars = await Car.find({ user_id }).sort({ createdAt: -1 });
    }

    res.status(200).json(cars);
}

const getCar = async (req,res) => {
    const {carId} = req.params

    if(!mongoose.Types.ObjectId.isValid(carId)){
        return res.status(404).json({error:"No such Id exists"})
    }

    const car = await Car.findById(carId).populate('user_id', 'email');

    if(!car){
        return res.status(404).json({error:'No such request exists'})
    }

    res.status(200).json(car)
}

const createCar = async (req,res) => {
    const {Plate , img} = req.body

    try{
        const user_id = req.user._id
        const car = await Car.create({Plate, img, user_id})
        res.status(200).json(car)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const updateCarStatus = async (req,res) => {
    const {carId} = req.params
    const {status} = req.body

    try{
        const car = await Car.findByIdAndUpdate(carId, { status }, { new: true });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(car);
    }catch(error){
        res.status(500).json({ error: 'Failed to update car status' });
    }
}

module.exports = {
    getCars,
    getCar,
    createCar,
    updateCarStatus
}