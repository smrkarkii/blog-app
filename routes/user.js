const {getUser, createUser, loginUser , logoutUser , updateUser} = require('../controllers/user')
const express = require('express')
const { createUserValidator} = require('../validator')
const {authUser} = require("../middlewares/auth")
const { render } = require('ejs')

const user_route = express.Router()
user_route.get('/users', getUser);
//register
user_route.post('/register', createUser);
user_route.get('/register', (req, res) => {
    res.render('register')
});
user_route.post('/login',loginUser )
user_route.get('/error', (req, res) => {
    res.render('error')
} )
user_route.get('/logout',logoutUser )
user_route.get('/dashboard', (req, res) => {
    res.render('dashboard')
} )
user_route.get('/login', (req, res) => {
    res.render('login')
} )
user_route.put('/:id',updateUser )


module.exports = user_route;    