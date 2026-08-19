const express = require('express')
const checkAuth = require('../../middleware/checkAuth')
const { addCar } = require('../../controller/addCarController')
const { upCar } = require('../../controller/upCarController')
const checkPlate = require('../../middleware/checkPlate')

const router =express.Router()

router.post('/car',checkAuth,checkPlate,addCar)

router.patch('/upcar',checkAuth,upCar)

module.exports = router