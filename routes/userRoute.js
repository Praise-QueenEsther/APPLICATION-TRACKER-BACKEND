const express = require('express')
const router = express.Router()
const {createSignup, createLogin, createForgetPassword,changePassword,verification}=require('../controller/userController')


router.post('/signup', createSignup)
router.post('/login', createLogin)
router.post('/forgetPassword', createForgetPassword)
router.post('/changePassword/:id', changePassword)
router.put('/verified/:verificationToken', verification)

module.exports = router

