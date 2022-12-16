const express = require('express')
const router = express.Router()
const trackerController = require('../controllers/tracker') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, trackerController.getTarget)

router.post('/updateTarget', trackerController.updateTarget)
// by Cy, added route to handle inserting a new food item to db
router.post('/addFoodItem',trackerController.addFoodItem)


module.exports = router