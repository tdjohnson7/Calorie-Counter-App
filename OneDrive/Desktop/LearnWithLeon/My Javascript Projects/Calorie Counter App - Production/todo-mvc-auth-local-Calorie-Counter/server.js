const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')

const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const calorieRoutes = require('./routes/calorie')
const trackerRoutes = require('./routes/tracker')

// wtf?
const test = 'hi'

// configures env file location
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/calorie', calorieRoutes)//new tdjohnson7
app.use('/tracker', trackerRoutes)
app.set('port',(process.env.PORT))
app.set('host',`0.0.0.0`)
app.listen(process.env.PORT), ()=>{
    console.log(`Server is running on 0.0.0.0:${process.env.PORT}, you better catch it!`)
}
