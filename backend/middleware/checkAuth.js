const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const checkAuth = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,secretKey);

        req.user = decoded;
        next();

    } catch(error){
        console.log("JWT Verification Error:",error.message);

        if(error.name === "TokenExpireError"){
            return res.status(401).json({
                message: "Token Expired. Please log in again"
            });
        }else if(error.name === "JsonWebTokenError"){
            return res.status(401).json({
                message: "Invalid token"
            });
        }else{
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

    }
}

module.exports = checkAuth;