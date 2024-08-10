require('dotenv').config()
import cors from "cors";

const express = require('express')
const mongoose = require('mongoose')
const carRoutes = require('./routes/car')
const userRoutes = require("./routes/user")
const carDBRoutes = require('./routes/carDB')

const app = express()

app.use(express.json())
app.use(cors());

// app.use((req,res,next)=>{
//     console.log(req.path,req.method)
//     next()
// })

app.use('/api/car',carRoutes)
app.use('/api/user',userRoutes)
app.use('/api/carDB',carDBRoutes)

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log('Listening on port ',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})

