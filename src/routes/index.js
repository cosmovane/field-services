const express = require('express')
const router = express.Router()
const pool = require('../database')

router.get('/', async (req, res) =>{
  const news = await pool.query('SELECT * FROM news ORDER BY created_at DESC LIMIT 3')
  news.forEach( current => {
    current.date = current.created_at.toString().slice(0,15)
  })
  
  res.render('landing', {news})
})

module.exports = router;