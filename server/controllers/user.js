const { User } = require('../models')
const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class ControllerUser {
  static create(req, res) {
    let input = req.body
    let passwordHash = hash(input.password)
    let newUser = {
      name: input.name,
      email: input.email,
      password: passwordHash
      // ========================================================
    }
    User.create(newUser)
      .then(data => {
        res.status(201).json({ data })
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findOne(req, res) {
    User.findOne({ _id: req.params.id })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => { res.status(500).json({ message: err.message }) })
  }
  static update(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static delete(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(user => {
        const response = {
          message: 'Successfully deleted user.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => { res.status(500).json({ message: err.message }) })
  }

  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: 'user tidak ada/ password salah' })
        } else {
          if (!compare(req.body.password, user.password)) {
            res.status(401).json({ message: 'user tidak ada/ password salah' })
          } else {
            let obj = {
              email: user.email
            }
            let access_token = sign(obj)
            res.status(201).json({ access_token: access_token })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
  static loginGoogle(req, res) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        User.findOne({ email: payload.email })
          .then(user => {
            if (!user) {
              return User.create({
                email: payload.email,
                name: payload.name,
                password: 'textPassword'
              })
            } else {
              const access_token = sign({
                name: user.name,
                email: user.email
              })
              res.status(200).json({ access_token })
            }
          })
          .then(user => {
            const access_token = sign({
              name: user.name,
              email: user.email
            })
            res.status(200).json({ access_token })
          })
          .catch(err => {
            res.status(500).json({ err: err.message })
          })
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
}

module.exports = ControllerUser