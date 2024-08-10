const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carSchema = new mongoose.Schema ({
    Plate:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
    },
    user_id:{
        type: String,
        ref: 'User',
        required: true,
    },
    img:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Car',carSchema)