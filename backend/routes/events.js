const express = require('express')
const eventController = require('../controllers/event')
const authorize = require('../middleware/authorize/authorize')
const router = express.Router({ mergeParams: true })

router.get('/', eventController.getAllEvents)
router.post('/filter', eventController.getFilteredEvents)
router.get('/:id', eventController.getEventById)
router.post('/add', authorize.authorize, eventController.addEvent)

module.exports = router