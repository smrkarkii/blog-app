const {getUser, createUser, loginUser , logoutUser , updateUser} = require('../controllers/user')
const express = require('express')
const { createUserValidator} = require('../validator')
const {authUser} = require("../middlewares/auth")

const user_route = express.Router()
user_route.get('/users', getUser);
//register
user_route.post('/signup', createUser);
user_route.post('/login',loginUser )
user_route.get('/logout',logoutUser )
user_route.put('/:id',updateUser )

module.exports = user_route;    