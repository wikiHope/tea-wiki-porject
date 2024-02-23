const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router({ mergeParams: true })

router.post('/login', authController.login)

module.exports = router