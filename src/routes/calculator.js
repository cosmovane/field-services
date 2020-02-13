const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../lib/auth')

router.get('/calculator', isLoggedIn, (req, res) =>{
  res.render('calculator/calculator')
})

router.get('/mileage', isLoggedIn, (req, res) => {
  res.render('calculator/mileage')
})

module.exports = router