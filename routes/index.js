const express = require('express')
// const router = express.Router()
// const services = require('./../services/index')
const { ensureAuth } = require('../auth/checkAuth')

module.exports = (app) => {
  // middleware
  app.get('/chars', ensureAuth)

  // routes
  app.use('/test', (req, res) => { res.send('Api connected') })
  app.use('/users', require('./users'))
  app.use('/chars', require('./character'))
}
