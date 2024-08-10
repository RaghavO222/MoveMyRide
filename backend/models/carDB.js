const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carDB = new mongoose.Schema ({
    Plate:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {})

module.exports = mongoose.model('carDB',carDB)