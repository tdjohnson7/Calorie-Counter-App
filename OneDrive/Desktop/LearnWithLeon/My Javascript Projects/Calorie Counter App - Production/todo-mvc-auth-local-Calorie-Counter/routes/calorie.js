//new tdjohnson7
const express = require('express')
const router = express.Router()
const calorieController = require('../controllers/calorie') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, calorieController.getTodos)
//changed
router.post('/createTodo', calorieController.createTodo)

router.put('/markComplete', calorieController.markComplete)

router.put('/markIncomplete', calorieController.markIncomplete)

router.delete('/deleteTodo', calorieController.deleteTodo)

module.exports = router