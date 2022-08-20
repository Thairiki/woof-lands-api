const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.check = (req, res) => {
  res.json('Route OK')
}

exports.logIn = (req, res, next) => {
  passport.authenticate(
    'local',
    {
      failureMessage: true
    },
    (err, response, message) => {
      if (err) console.log(err)
      if (response) return res.json({ user_id: response.id, session_id: req.session.id })
      return res.json(message)
    }
  )(req, res, next)
}

exports.logOut = (req, res, next) => {
  console.log(req.isAuthenticated())
  req.logout()
  res.status(200).json({
    response: 'You are logged out',
    redirect: '/'
  })
}

exports.register = (req, res, next) => {
  const { name, username, email, password, password2 } = req.body
  const errors = []

  // validate required fields
  if (!name || !username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill all fields (name, username, email, password, password2)' })
  }

  // validate passwords match
  if (password !== password2) errors.push({ msg: 'Passwords do not match' })

  // validate passwords length
  if (password) {
    if (password.length < 6) {
      errors.push({ msg: 'Passwords should be at least 6 characters' })
    }
  }

  if (errors.length > 0) return res.status(400).send(errors)

  passport.authenticate('local-signUp', { }, (err, user) => {
    if (err) {
      console.log(err)
      res.json('Error', err)
    }
    res.json('Success', user)
  })

  // User.findOne({ email }).then((user) => {
  //   if (user) return res.status(400).send('E-mail is already registered')
  //   const newUser = new User({ name, username, email, password })
  //
  //   // hash password
  //   bcrypt.genSalt(10, (err, salt) => {
  //     if (err) throw err
  //     bcrypt.hash(newUser.password, salt, (err, hash) => {
  //       if (err) throw err
  //       // set password to hash
  //       newUser.password = hash
  //       // save user
  //       newUser
  //         .save()
  //         .then((user) => {
  //           res.json('Success')
  //         })
  //         .catch((err) => console.log(err))
  //     })
  //   })
  // })
}
