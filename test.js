var createQueue = require('./')
var test        = require('tape')

test('frame-queue', function(t) {
  var queue = createQueue()
  var n = 0

  t.plan(1)

  queue.on('hello', function() {
    t.equal(1, ++n, 'hello event was fired once')
  })

  for (var i = 0; i < 100; i++) {
    queue('hello')
  }
})
