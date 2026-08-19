const express = require('express')
const checkAuth = require('../../middleware/checkAuth')

const router =express.Router()

const { getReq, postReq } = require("../../controller/getReqController")
const { getAllReq } = require("../../controller/getAllReqController")
const { getSpecReq } = require("../../controller/getSpecReqController")
const { getmail } = require("../../controller/getEmailController")
const { addPhoto } = require("../../controller/cloudinaryController")

router.get('/greq',checkAuth,getReq)

router.get('/gallreq',checkAuth,getAllReq)

router.post('/preq',checkAuth,postReq)

router.post('/sreq',checkAuth,getSpecReq)

router.post('/getmail',checkAuth,getmail)

router.post('/upload',checkAuth,addPhoto)

module.exports = router