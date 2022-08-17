const {getUser, getOneUser, createUser, registerPage ,  homeuser, loginUser ,logoutUser , updateUser, deleteUser} = require('../controllers/user')
const express = require('express')
const { createUserValidator} = require('../validator')
const {authUser} = require("../middlewares/auth")
const { urlencoded } = require('body-parser')
const bodyParser = require('body-parser')

const user_route = express.Router()
const urlencodedParser = bodyParser.urlencoded({extend: false})


user_route.get('/users', getUser);

//register
user_route.post('/register' , createUser);
user_route.get('/register' ,  registerPage);
user_route.post('/login',loginUser )
user_route.get('/login',homeuser )
user_route.get('/logout',logoutUser )
user_route.get('/:id',getOneUser )
user_route.put('/:id',updateUser )
user_route.delete('/:id',deleteUser )

module.exports = user_route;    