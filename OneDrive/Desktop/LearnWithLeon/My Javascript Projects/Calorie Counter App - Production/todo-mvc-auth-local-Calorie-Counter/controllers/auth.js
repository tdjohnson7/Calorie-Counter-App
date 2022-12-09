const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/tracker')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (validator.isEmpty(req.body.userName)) validationErrors.push({ msg: 'Please enter a username.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/tracker')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/tracker')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    req.body.userName.trim()
    if (req.body.userName.length<4) validationErrors.push({ msg: 'Please enter a username longer than 4 characters.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    // if (req.body.targetCalories ==null ) validationErrors.push({ msg: 'Please enter a target calorie count.' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    let user;
    if(req.body.targetCalories){
      user = new User({
        userName: req.body.userName,
        targetCalories:Number(req.body.targetCalories),
        password: req.body.password
      })
    }else{
      user = new User({
        userName: req.body.userName,
        password: req.body.password
      })
    }
  
    User.findOne({
      userName: req.body.userName
    }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/tracker')
        })
      })
    })
  }