const {getPosts, createPosts, getOnePost, deletePost , updatePost} = require('../controllers/post')
const express = require('express')
const validator = require('../validator')
const {authUser} = require('../middlewares/auth.js')


const post_route = express.Router()

post_route.get('/posts', getPosts);
post_route.post('/posts/create-post', createPosts);
post_route.put('/posts/:id', updatePost);
post_route.get('/posts/:id',  getOnePost);
//router.put('/:id', authUser, validator.createPostValidator, createPosts);
post_route.delete('/posts/:id',  deletePost);

module.exports = post_route;    