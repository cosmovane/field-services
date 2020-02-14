const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const { database } = require('./keys')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const http = require('http')
const multer = require('multer') 

// multer configuration for images
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

// initializations
const app = express()
const server = http.createServer(app)
require('./lib/passport')

//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

//middlewares
app.use(session({
  secret: 'fieldservices',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/uploads'),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(null, true)
    }
  }
}).single('image'))


// global variables
app.use(async (req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.error = req.flash('error');
  app.locals.user = req.user

  next();
});


//routes
app.use(require('./routes/'))
app.use(require('./routes/calculator'))
app.use(require('./routes/authentication'))
app.use('/news', require('./routes/news'))
app.use('/materials', require('./routes/materials'))

//public
app.use(express.static(path.join(__dirname, '/public')))

//starting server
server.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})

