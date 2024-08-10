const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id,type) => {
    return jwt.sign({_id,type},process.env.SECRET, {expiresIn: '2d'})
}

const loginUser = async(req,res) => {
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)

        const token = createToken(user._id,user.type)

        res.status(200).json({email,token,type:user.type})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const signupUser = async(req,res) => {
    const {email,password} = req.body

    try{
        const user = await User.signup(email,password)

        const token = createToken(user._id,user.type)

        res.status(200).json({email,token,type:user.type})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = { signupUser,loginUser }