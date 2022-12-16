const mongoose = require('mongoose')

const TargetSchema = new mongoose.Schema({
  target: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Target', TargetSchema)
