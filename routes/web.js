const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/home', (req, res) => {
    res.render('home')
})
router.get('/aboutus', (req, res) => {
    res.render('aboutus')
})

router.get('/showreport', (req, res) => {
    res.render('showreport')
})

router.get('/addproduct', (req, res) => {
    res.render('addProduct')
});

module.exports = router;