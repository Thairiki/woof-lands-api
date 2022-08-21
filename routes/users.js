const express = require('express')

const router = express.Router()
const service = require('./../services/users')
const { ensureAuth } = require('./../auth/checkAuth')

router.get('/', service.check)
router.post('/login', service.logIn)
router.post('/logout', ensureAuth, service.logOut)
router.post('/register', service.register)
router.get('/authtest', ensureAuth, (req, res) => {
  res.send('parabains')
})

module.exports = router
