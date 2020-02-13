const express = require('express')
const router = express.Router()
const pool = require('../database')
const helpers = require('../lib/helpers')

router.get('/', async (req, res) => {
    const news = await pool.query('SELECT * FROM news ORDER BY created_at DESC')
    res.render('news/list', { news })
})

router.get('/create', (req, res) => {
    res.render('news/create')
})

router.post('/create', async (req, res) => {
    const { title, summary, body } = req.body
    if (req.file) {
        const validType = helpers.fileType((req.file.mimetype).toLowerCase(), (req.file.originalname).toLowerCase())
        const imageSize = helpers.imageSize(req.file.size)
        if (!validType) {
            req.flash('error', 'File must be a valid type')
            res.redirect('/news/create')
        }
        if (!imageSize) {
            req.flash('error', 'File size must be less than 2MB')
            res.redirect('/news/create')
        }
    }
    const imageName = req.file ? req.file.filename : 'default.jpg'
    const newNews = {
        title,
        summary,
        body,
        image: imageName
    }
    await pool.query('INSERT INTO news SET ?', [newNews])
    req.flash('success', 'News added')
    res.redirect('/news/')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const news = await pool.query('SELECT * FROM news WHERE id = ?', [id])
    res.render('news/edit', { news: news[0] })
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    console.log("TCL: id", id)
    const { title, summary, body } = req.body
    console.log("TCL: title, summary, body", title, summary, body)
    let imageName
    console.log(req.file);
    if (req.file) {
        const validType = helpers.fileType((req.file.mimetype).toLowerCase(), (req.file.originalname).toLowerCase())
        const imageSize = helpers.imageSize(req.file.size)
        if (!validType) {
            req.flash('error', 'File must be a valid type')
            res.redirect('/news/create')
        }
        if (!imageSize) {
            req.flash('error', 'File size must be less than 2MB')
            res.redirect('/news/create')
        }
        imageName = req.file.filename
        console.log("TCL: imageName", imageName)
    } else {
        const imageResult = await pool.query('SELECT image FROM news WHERE id = ?', [id])
        imageName = imageResult[0].image
        console.log("TCL: imageName", imageName)
    }
    await pool.query('UPDATE news SET title = ?, summary = ?, image = ?, body = ? WHERE id = ?', [title, summary, imageName, body, id])
    req.flash('success', 'News updated')
    res.redirect('/news/')
})

router.get('/show/:id', async (req, res) => {
    const { id } = req.params
    const news = await pool.query('SELECT * FROM news WHERE id = ?', [id])
    const date = news[0].created_at.toString().slice(0,15)
    res.render('news/show', { news: news[0], date })
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    const news = await pool.query('SELECT * FROM news WHERE id = ?', [id])
    const date = news[0].created_at.toString().slice(0,15)
    res.render('news/delete', { news: news[0], date })
})

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM news WHERE id = ?', [id])
    req.flash('success', 'News deleted')
    res.redirect('/news/')
})

module.exports = router;