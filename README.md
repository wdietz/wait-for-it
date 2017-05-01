# Wait For It

Usage:


// testing it out
$('.invalid-class').remove()

$('.invalid-class')
    .waitForIt({timeout: 1000, interval: 10})
    .then(x => console.log('resolved: ', x), x => console.log('rejected: ', x))

setTimeout(function() {
    $('body').append($('<div />').addClass('invalid-class'))
    console.log('appended')
}, 1000)
