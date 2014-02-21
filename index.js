var keys = Object.keys || require('object-keys')
var EventEmitter = require('events/')
var raf = (
  typeof window !== 'undefined'
) ? require('raf-component')
  : global.setImmediate || process.nextTick

module.exports = createQueue

function createQueue() {
  var frame = false
  var pending = {}

  enqueue._events   = {}
  enqueue.__proto__ = EventEmitter.prototype

  // Mixin EventEmitter behavior onto the function
  Object.keys(EventEmitter.prototype).forEach(function(key) {
    enqueue[key] = EventEmitter.prototype[key]
  })

  return enqueue

  function enqueue(event) {
    pending[event] = (pending[event]|0) + 1
    if (frame) return
    raf(flush)
    frame = true
  }

  function flush() {
    frame = false

    keys(pending).forEach(function(key) {
      enqueue.emit(key, pending[key])
      delete pending[key]
    })
  }
}
