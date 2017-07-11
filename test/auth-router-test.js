'use strict'

const expect = require('expect')

describe('testing tests', () => {
  it('should pass', () => {
    expect(true).toEqual(true)
  })

  it('should fail', () => {
    expect(false).toEqual(true)
  })
})
