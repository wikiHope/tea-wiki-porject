const express = require('express')
const categoryController = require('../controllers/category')
const authorize = require('../middleware/authorize/authorize')
const router = express.Router({ mergeParams: true })

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/add', authorize.authorize, categoryController.addCategory)

module.exports = router