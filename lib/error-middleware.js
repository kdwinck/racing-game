'use strict'

module.exports = (err, req, res) => {
  console.error(err.message)

  if (err.message.includes('unauthorized')) return res.sendStatus(401)

  if (err.mesage.includes('validation failed')) return res.sendStatus(400)

  if (err.message.includes('objectid failed')) return res.sendStatus(404)

  if (err.message.includes('duplicate key')) return res.sendStatus(409)

  res.sendStatus(500)
}
