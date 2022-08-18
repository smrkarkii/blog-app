const {getPosts, createPosts} = require('../controllers/post')
const express = require('express')
const validator = require('../validator')
const {authUser} = require('../middlewares/auth.js')

const router = express.Router()
router.get('/posts', getPosts);
router.post('/create-post', createPosts);

module.exports = router;    