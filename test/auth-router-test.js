'use strict'

require('dotenv').config({path: `${__dirname}/../.test.env`})

const expect = require('expect')
const superagent = require('superagent')

const server = require('../lib/server')
const cleanDB = require('./lib/clean-db')
// const mockUser = require('./lib/mock-user')

const API_URL = process.env.API_URL

describe('testing tests', () => {
  it('should pass', () => {
    expect(true).toEqual(true)
  })
})

describe('testing auth router', () => {
  before(server.start)
  after(server.stop)
  afterEach(cleanDB)

  describe('testing POST /api/signup', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'test_user',
          password: 'top secret',
          email: 'test@email.test',
        })
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.text).toExist()
          expect(res.text.length > 1).toBeTruthy()
        })
    })
  })
})
