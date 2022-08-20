import express from 'express'
import createError from 'http-errors'
import mongoose from 'mongoose'
import path from 'path'
import env from 'dotenv'
import logger from 'morgan'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'

const app = express()

// dotenv
if (app.get('env') === 'production') {
  env.config({ path: './.env.prod' })
}
if (app.get('env') === 'development') {
  env.config({ path: './.env.dev' })
}

// connect to db
const db = mongoose.connect(process.env.URI_DB).then(m => { m.connection.getClient() })

mongoose.connection.on('open', () => {
  console.log('MongoDB connected!')
})

mongoose.connection.on('error', (err) => {
  console.log(`Can't connect to database! -> ${err}`)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// passport local
require('./auth/local')(passport)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// session config
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'auth',
  store: MongoStore.create({
    mongoUrl: process.env.URI_DB,
    crypto: {
      secret: process.env.SESSION_SECRET
    }
  })
}
if (app.get('env') === 'production') {
  console.log('Production mode')
  env.config({ path: './.env.dev' })
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = 'auto' // serve secure cookies
}
app.use(session(sess))

// passport middleware
app.use(passport.initialize(undefined))
app.use(passport.session(undefined))

// routes
require('./routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
