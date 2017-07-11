'use strict'

require('dotenv').config({path: `${__dirname}/../.test.env`})

const expect = require('expect')
const superagent = require('superagent')

const server = require('../lib/server')
const cleanDB = require('./lib/clean-db')
const mockUser = require('./lib/mock-user')

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

  describe('testing unregistered route', () => {
    it('should respond 404', () => {
      return superagent.get(`${API_URL}/api/unregistered`)
        .catch(err => {
          expect(err.status).toEqual(404)
        })
    })
  })

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

    it('should respond 400 with no data sent', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({})
        .catch(err => {
          expect(err.status).toEqual(400)
        })
    })

    it('should respond 400 with incorrect data sent', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'fail',
        })
        .catch(err => {
          expect(err.status).toEqual(400)
        })
    })
  })

  describe('testing GET /api/login', () => {
    it('should respond with a user', () => {
      let tempUser
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64')
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`)
        })
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.text).toExist()
          expect(res.text.length > 1).toBeTruthy()
        })
    })

    it('should respond 401 if no auth header provided', () => {
      return superagent.get(`${API_URL}/api/login`)
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })

    it('should respond 401 if no basic auth provided', () => {
      return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', 'Bearer ')
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })

    it('should respond 401 if no username or password provided', () => {
      return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', 'Basic ')
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })

    it('should respond 401 if no user is found', () => {
      let mockEncoded = new Buffer('username').toString('base64')
      return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${mockEncoded}`)
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })

    it('should respond 401 if given an incorrect password', () => {
      let tempUser
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user
          let mockEncoded = new Buffer(`${tempUser.username}:password}`).toString('base64')
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${mockEncoded}`)
        })
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })
  })
})
