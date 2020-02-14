const express = require('express')
const router = express.Router()
const passport = require('passport')
const pool = require('../database')
const helpers = require('../lib/helpers')
const { isNotLoggedIn, adminIsLoggedIn } = require('../lib/auth')

router.get('/users', adminIsLoggedIn, async (req, res) => {
    const users = await pool.query('SELECT * FROM users ORDER BY username')
    res.render('authentication/users', { users })
})

router.get('/signup', (req, res) => {
    res.render('authentication/signup')
})

router.post('/signup',
    passport.authenticate('local.adminSignUp', { 
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    })
)

router.get('/signout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('authentication/signin')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signIn', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.get('/create', adminIsLoggedIn, (req, res) => {
    res.render('authentication/create')
})

router.post('/create', adminIsLoggedIn,
    passport.authenticate('local.createUser', {
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    })
)

router.get('/changepassword/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    res.render('authentication/change-password', { person: user[0] })
})

router.post('/changepassword/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    const { password1, password2 } = req.body
    const matchedPassword = password1.localeCompare(password2)
    if (matchedPassword === 0) {
        const password = await helpers.encryptPassword(password1)
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [password, id])
        const user = await pool.query('SELECT fullname FROM users WHERE id = ?', [id])
        req.flash('success', `Password of user ${user[0].fullname} was updated successfully`)
        res.redirect('/users')
    } else {
        req.flash('error', "Passwords doesn't match")
        res.redirect(`/changepassword/${id}`)
    }
})

router.get('/edit/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    res.render('authentication/edit', { person: user[0] })
})

router.post('/edit/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    const { fullname, username } = req.body
    await pool.query('UPDATE users SET fullname = ?, username = ? WHERE id = ?', [fullname, username, id])
    req.flash('success', 'User updated')
    res.redirect('/users')
})

router.get('/delete/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    res.render('authentication/delete', { person: user[0] })
})

router.post('/delete/:id', adminIsLoggedIn, async (req, res) => {
    const { id } = req.params
    console.log("TCL: req.params", req.user.id)
    if (id != req.user.id) {
        await pool.query('DELETE FROM users WHERE id = ?', [id])
        req.flash('success', 'User deleted')
        res.redirect('/users')
    } else {
        req.flash('error', 'You cannot delete yourself')
        res.redirect('/users')
    }
})

module.exports = router;