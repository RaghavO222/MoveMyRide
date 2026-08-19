const {Schema,model} = require("mongoose");

const carSchema = new Schema({
    plate: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    });

    module.exports=model("Car",carSchema,"car")