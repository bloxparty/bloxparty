/*global describe, it*/
var assert = require('assert')
var queue = require('../queue')

describe('Queue', function () {
  it('returns a new array of shapes', function () {
    assert(queue() !== queue())
  })
  it('doesnt duplicate shapes within every 7 shapes', function () {
    var arr = queue()
    while (arr.length) {
      var i = 7
      var temp = []
      while (i > 0) {
        var shape = arr.shift()
        assert(temp.indexOf(shape) === -1)
        temp.push(shape)
        --i
      }
    }
  })
})
