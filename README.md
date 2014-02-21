# frame-queue [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/frame-queue&title=frame-queue&description=hughsk/frame-queue%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Queue up events, triggering once at the beginning of the next frame to reduce
over-updating visual elements.

## Usage ##

[![frame-queue](https://nodei.co/npm/frame-queue.png?mini=true)](https://nodei.co/npm/frame-queue)

### `queue = frameQueue()` ###

Creates a new frame queue to listen to and trigger.

### `queue(event)` ###

Queues up an `event` to be triggered in the next frame. You can do this
multiple times in a single frame and know that the update will only fire the
one time it needs to.

### `queue.on(event, callback)` ###

Listen to events named `event`, calling `callback` when they're fired.

``` javascript
var createQueue = require('frame-queue')

var model = { _value: 'lorem' }

model.element = document.createElement('div')
model.queue = createQueue().on('value', function() {
  // only fired once, despite the update
  // logic being triggered 100 times in the same frame
  model.element.innerHTML = model.value
})

Object.defineProperty('value', {
    get: function() { return this._value }
  , set: function(value) {
    this._value = value
    this.queue('value')
  }
})

for (var i = 0; i < 100; i++) {
  model.value = 'ipsum'
}
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/frame-queue/blob/master/LICENSE.md) for details.
