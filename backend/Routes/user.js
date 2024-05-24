const express = require('express')
const route=express.Router()
const {signup,activate,signin} = require('../controllers/UserController')


route.post("/signup",signup)
route.get(`/activate/:activationCode`,activate)
route.post('/signin',signin)



module.exports=route