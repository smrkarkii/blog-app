const {createCat, getCat } = require('../controllers/categories')
const express = require('express')

const cat_route = express.Router();

cat_route.post('/categories', createCat)
cat_route.get('/categories', getCat)


module.exports= cat_route;