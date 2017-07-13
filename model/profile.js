'use strict'

const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  garage: {type: mongoose.Schema.Types.ObjectId},
})

module.exports = mongoose.model('profile', profileSchema)
