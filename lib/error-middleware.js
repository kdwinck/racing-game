'use strict'

module.exports = (err, req, res, next) => {
  console.error(err.message)

  if (err.message.includes('unauthorized')) res.sendStatus(401)

  if (err.mesage.includes('validation failed')) res.sendStatus(400)

  if (err.message.includes('objectid failed')) res.sendStatus(404)

  if (err.message.includes('duplicate key')) res.sendStatus(409)

  res.sendStatus(500)
}
