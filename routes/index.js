import express from 'express'
const router = express.Router()
// const services = require('./../services/index')
const { ensureAuth } = require('../auth/checkAuth')

module.exports = (app) => {
  // middleware
  app.get('/chars', ensureAuth)

  // routes
  app.use('/users', require('./users'))
  app.use('/chars', require('./character'))
}
