//new tdjohnson7
// modified by Cy
const mongoose = require('mongoose')

const CalorieSchema = new mongoose.Schema({
  foodItems: {
    type: Array,
    required: true,
    default:[]
  },
  date:{
    type:Object,
    required:true,
    default:{
      day:new Date().getDate(),
      month:new Date().getMonth(),
      year:new Date().getFullYear(),
    }
  },
  sum:{
    type:Number,
    default:0,
    required:true
  },
  goalMet: {
    type: Boolean,
    required: true,
    default:false
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Calorie', CalorieSchema)