const {getUser, createUser, loginUser , logoutUser} = require('../controllers/user')
const express = require('express')
const { createUserValidator} = require('../validator')
const {authUser} = require("../middlewares/auth")

const user_route = express.Router()
user_route.get('/users', getUser);
user_route.post('/signup', createUserValidator, createUser);
user_route.post('/login',loginUser )
user_route.get('/logout',logoutUser )

module.exports = user_route;    