const express = require('express')
const router = express.Router()
const service = require('./../services/character')
// const { checkAuth } = require('./../auth/checkAuth')

router.get('/', service.find)
router.post('/', service.create)
router.put('/:id', service.update)

module.exports = router
