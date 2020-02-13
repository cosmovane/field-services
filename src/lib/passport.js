const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../lib/helpers')

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local.adminSignUp', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body
    const duplicateUsername = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (duplicateUsername.length > 0) {
        done(null, false, req.flash('error', 'Username is already taken, select a diferent username'))
    } else {
        const newUser = {
            username,
            password,
            fullname,
            isAdmin: true
        }
        newUser.password = await helpers.encryptPassword(password)
        const result = await pool.query('INSERT INTO users SET ?', newUser)
        newUser.id = result.insertId
        return done(null, false)
    }
}))


passport.use('local.signIn', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0]
            const validPassword = await helpers.matchPassword(password, user.password)
            if (validPassword) {
                done(null, user, req.flash('success', `Welcome ${user.fullname}`))
            } else {
                done(null, false, req.flash('error', 'Wrong password'))
            }
    } else {
        done(null, false, req.flash('error', "This user doesn't exist"))
    }
}))

passport.use('local.createUser', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body
    const duplicateUsername = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (duplicateUsername.length > 0) {
        done(null, false, req.flash('error', 'Username is already taken, select a diferent username'))
    } else {
        const newUser = {
            username,
            password,
            fullname,
            isAdmin: false
        }
        newUser.password = await helpers.encryptPassword(password)
        const result = await pool.query('INSERT INTO users SET ?', newUser)
        newUser.id = result.insertId
        return done(null)
    }
}))