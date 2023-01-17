const express = require('express');
const router = express.Router();

// categories
const api_catagories = require('./api_Categories');
router.use('/api/categories',api_catagories);

// products
const api_products = require('./api_Products');
router.use('/api/products',api_products);

// users
const api_users = require('./api_users');
router.use('/api/users',api_users);

// test gọi đến index
router.get('/index',(req,res)=>{
    var link = req.originalUrl;
    var main = 'partials/main';
    res.render('index',{main:main,link:link});
});

// test gọi đến categories
// router.get('/categories/index',(req,res)=>{
//     var link = req.originalUrl;
//     var main = 'categories/index';
//     res.render('index',{main:main,link:link});
// });

// gọi đến category_controllers
const categoy_controllers = require('./categories_controllers');
router.use('/categories',categoy_controllers);

// gọi đến products_controllers
const products_controllers = require('./product_controllers');
router.use('/products',products_controllers);

// gọi đến users_controllers
const users_controllers = require('./users_controllers');
router.use('/users',users_controllers);

module.exports = router;