module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('yo')
      return next()
    }
    return res.status(403).json({
      response: 'Not authorized'
    })
  },
  forwardAuth: () => {
  }
}
