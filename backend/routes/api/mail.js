const express = require('express')
const checkAuth = require('../../middleware/checkAuth')
const router =express.Router()
const {sendCred} = require('../../controller/sendCredController')
const {sendNoti} = require('../../controller/sendNotiController')

router.post('/sendcred',checkAuth,sendCred)

router.post('/sendnoti',checkAuth,sendNoti)

module.exports = router