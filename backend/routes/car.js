const express = require('express')
const {
    getCars,
    getCar,
    createCar,
    updateCarStatus
} = require('../controller/carController')
const requireAuth= require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/',getCars)

router.get('/:carId',getCar)

router.post('/',createCar)

router.patch('/:carId',updateCarStatus)

module.exports = router 