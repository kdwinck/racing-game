'use strict'

const {Router} = require('express')
const jsonParser = require('body-parser').json()

const User = require('../model/user')
// const basicAuth = require('../lib/basic-auth-middleware')

const authRouter = module.exports = new Router()

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  User.create(req.body)
    .then(token => {
      console.log(token)
      res.send(token)
    })
    .catch(next)
})
