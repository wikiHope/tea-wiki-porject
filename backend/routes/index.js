const express = require('express')

const authRoute = require('./auth')
const usersRoute = require('./users')
const eventsRoute = require('./events')
const categoriesRoute = require('./categories')
const locationsRoute = require('./locations')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/events', eventsRoute)
router.use('/categories', categoriesRoute)
router.use('/locations', locationsRoute)

module.exports = router