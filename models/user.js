const mongoose = require('mongoose')
require('mongoose-type-email')
const bcrypt = require('bcryptjs')

const User = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

User.methods.genHash = (password) => {
  // hash password
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err
      return hash
    })
  })
}

module.exports = mongoose.model('User', User)
