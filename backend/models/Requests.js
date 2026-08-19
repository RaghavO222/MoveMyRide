const {Schema,model} = require("mongoose");

const reqSchema = new Schema({
    plate: {
        type: String,
        required: true,
    },
    madeBy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    });

    module.exports=model("Req",reqSchema,"req")