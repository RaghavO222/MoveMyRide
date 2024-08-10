const express = require('express')
const {getEmail,sendEmail} = require("../controller/carDBController")

const requireAuth= require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:Plate',getEmail)

router.get('/sendMail/:Plate',sendEmail)

module.exports = router