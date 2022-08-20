const { BasicStrategy } = require('passport-http')

module.exports = new BasicStrategy((username, password, done) => {
  if (username === 'admin' && password === 'admin') return done(null, true)
  return done(null, false)
}, () => {})
