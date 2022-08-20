const LocalStrategy = require('passport-local').Strategy
// const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id: user.id, username: user.username })
    })
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        process.nextTick(() => {
          return done(null, user)
        })
      })
      .catch((err) => {
        process.nextTick(() => {
          return done(err, {})
        })
      })
  })

  passport.use(
    'local-signIn',
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password' },
      (email, password, done) => {
        // match user
        User.findOne({ email }, (err, user) => {
          if (err) return done(err)
          if (!user) {
            return done(null, false, {
              message: "User or password doesn't match"
            })
          }
          // match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            }
            return done(null, false, {
              message: "User or password doesn't match"
            })
          })
        })
      }
    )
  )

  passport.use(
    'local-signUp',
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
      (req, username, password, done) => {
        User.findOne({ username })
          .then((user) => {
            if (!user) {
              const newUser = new User(req.body)
              // set password to hash
              newUser.password = newUser.genHash(newUser.password)
              // save user
              newUser
                .save()
                .then((user) => {
                  return done(null, user)
                })
                .catch((err) => console.log(err))
            }
            return done(null, false)
          })
          .catch((err) => {
            return done(err, false)
          })
      }
    )
  )
}
