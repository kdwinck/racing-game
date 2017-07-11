'use strict'

const User = require('../../model/user')

let removeModelWithHook = (model) =< {
  return model.find({})
    .then(items => Promise.all(items.map(a => a.remove())))
}

module.exports = () => {
  return Promise.all([
    removeModelWithHook(User),
  ])
}
