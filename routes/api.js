const express = require('express');
const router = express.Router();

const authJWT = require("../middlewares/authJWT");

const userController = require('../controllers/user');
const productController = require('../controllers/product');

// Login and Register routes
router.post('/login', userController.login);
router.post('/register', userController.register);

// Product Routes
router.get('/product', [authJWT.verifyToken], productController.list)

router.post('/product', [authJWT.verifyToken], productController.create)

router.delete('/product/:id', [authJWT.verifyToken], productController.destroy);

router.put('/product/:id', [authJWT.verifyToken], productController.update);

module.exports = router;