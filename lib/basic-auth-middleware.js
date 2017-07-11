'use strict'

const User = require('../model/user')

module.exports = (req, res, next) => {
  const {authorization} = req.headers
  if (!authorization) return next(new Error('unauthorized no authorization provided'))

  let encoded = authorization.split('Basic ')[1]
  if (!encoded) return next(new Error('unauthorized no basic auth provided'))

  let decoded = new Buffer(encoded, 'base64').toString()

  let [username, password] = decoded.split(':')

  if (!username || !password) return next(new Error('unauthorized username or password was missing'))

  User.findOne({username})
    .then(user => {
      if (!user) return next(new Error('unauthorized user does not exist'))
      return user.passwordHashCompare(password)
    })
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => {
      console.log('ERROR:', err)
      next(new Error('unauthorized find one failed in basic auth middelware'))
    })

}
