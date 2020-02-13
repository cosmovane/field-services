const express = require('express')
const router = express.Router()
const pool = require('../database')

router.get('/', async (req, res) => {
  const materials = await pool.query('SELECT * FROM materials ORDER BY description')
  if (req.user.isAdmin) {
    res.render('materials/list-admin', { materials })
  } else {
    res.render('materials/list', { materials })
  }
})

router.get('/create', async (req, res) => {
  const categories = await pool.query('SELECT * FROM categories ORDER BY name ASC')
  res.render('materials/create', { categories })
})

router.post('/create', async (req, res) => {
  const { category, description, rate } = req.body
  const correctRate = rate ? rate : null
  const newMaterial = {
    category,
    description,
    rate: correctRate
  }
  await pool.query('INSERT INTO materials SET ?', [newMaterial])
  req.flash('success', 'Material added')
  res.redirect('/materials/')
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  const material = await pool.query('SELECT * FROM materials where id = ?', [id])
  const currentCategory = material[0].category
  const categories = await pool.query('SELECT * FROM categories WHERE name <> ? ORDER BY name ASC', [currentCategory])
  res.render('materials/edit', { categories, material: material[0] })
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { category, description, rate } = req.body
  const correctRate = rate ? rate : null
  await pool.query('UPDATE materials SET category = ?, description = ?, rate = ? WHERE id = ?', [category, description, correctRate, id])
  req.flash('success', 'Material updated')
  res.redirect('/materials/')
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  const material = await pool.query('SELECT * FROM materials WHERE id = ?', [id])
  res.render('materials/delete', { material: material[0] })
})

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM materials WHERE id = ?', [id])
  req.flash('success', 'Material deleted')
  res.redirect('/materials/')
})


module.exports = router;