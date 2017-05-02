# Wait For It
Return a promise that waits until a selector matches an element.
It will resolve when the element exists in the DOM or reject if the timeout is reached.

```javascript
var promise = $('.future-class').waitForIt()

promise.then(
    function($element) {
        console.log('resolved: ', $element)
    }, 
    function($element) {
        console.log('rejected: ', $element)
    }
)
```

Usage
-----
```javascript
// testing it out
$('.invalid-class').remove()

$('.invalid-class')
    .waitForIt({timeout: 1000, interval: 10})
    .then(x => console.log('resolved: ', x), x => console.log('rejected: ', x))

setTimeout(function() {
    $('body').append($('<div />').addClass('invalid-class'))
    console.log('appended')
}, 1000)
```

Options
-------
- **interval**: How often to run the resolveCheck (in milliseconds). The default is every 100 milliseconds.
- **timeout**: Reject the promise after checking for this long (in milliseconds) default is 1 minute (60,000 milliseconds)
- **minLength**: The default check resolves when this many elements match the selector
- **selector**: This selector is used to match against each interval. The default uses the deprecated .selector from the jQuery object.
- **resolveCheck**: this function is run each interval, if it returns a truthy value the promise is resolved.
- **rejectCheck**: this function is run each interval, if it returns a truthy value the promise is rejected.

The resolveCheck and rejectCheck functions have the same arguments
- the jQuery object
- the options default Options extended with those provided
- the ammount of time the check has run for so far (in milliseconds)

Default Options
---------------
```javascript
var defaultOptions = {
    interval: 100,
    timeout: 6e4,
    selector: $(this).selector,
    minLength: 1,
    resolveCheck: function($ele, settings, runTime) {
      return $ele.length >= settings.minLength
    },
    rejectCheck: function($ele, settings, runTime) {
      return $ele.length < settings.minLength && settings.timeout <= runTime
    },
}
```
