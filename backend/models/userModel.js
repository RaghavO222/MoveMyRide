const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "user"
    }
});

userSchema.statics.signup = async function(email, password) {
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const exist = await this.findOne({ email });

    if (exist) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
};

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("Incorrect email");
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema);