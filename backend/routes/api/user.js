const express = require('express')

const router =express.Router()

const { signupUser, googleUser  } = require('../../controller/userController')
const checkAuth = require('../../middleware/checkAuth')
const { adduser } = require('../../controller/addUserController')

const {loginUser} = require('../../controller/loginController')

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.get('/google/callback', googleUser)

router.post('/adduser',checkAuth,adduser)

module.exports = router