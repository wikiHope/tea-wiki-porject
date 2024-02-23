const express = require('express')
const locationController = require('../controllers/location')
const authorize = require('../middleware/authorize/authorize')
const router = express.Router({ mergeParams: true })

router.get('/', locationController.getAllLocations)
router.get('/:id', locationController.getLocationById)
router.post('/add', authorize.authorize, locationController.addLocation)

module.exports = router