const Character = require('./../models/character')

exports.find = (req, res) => {
  Character.find(req.body, (err, response) => {
    if (err) return res.status(400).send(`Something went wrong! ${err}`)
    res.send(response)
  })
}

exports.create = (req, res) => {
  Character.create(req.body, (err, response) => {
    if (err) return res.status(400).send(`Something went wrong! ${err}`)
    res.send(response)
  })
}

exports.update = (req, res) => {
  Character.updateOne(
    {
      _id: req.params.id
    },
    req.body,
    (err, response) => {
      if (err) return res.status(400).send(`Something went wrong! ${err}`)
      res.send(response)
    }
  )
}

exports.delete = (req, res) => {
  Character.deleteOne(
    {
      _id: req.params.id
    },
    req.body,
    (err, response) => {
      if (err) return res.status(400).send(`Something went wrong! ${err}`)
      res.send(response)
    }
  )
}
