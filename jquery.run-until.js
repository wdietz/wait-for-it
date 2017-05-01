(function($) {
    var defaultOptions = {
        interval: 100,
        timeout: 6e4,
        minLength: 1,
        resolveCheck: function($ele, settings, runTime) {
            return $ele.length >= settings.minLength
        },
        rejectCheck: function($ele, settings, runTime) {
            return $ele.length < settings.minLength && settings.timeout <= runTime
        },
    }

    function update($ele, settings, runTime, p, cancelInterval) {
        var $this = $($ele.selector)
        if(settings.resolveCheck($this, settings, runTime)) {
            clearInterval(cancelInterval)
            p.resolve($this)
        }
        else if(settings.rejectCheck($this, settings, runTime)) {
            clearInterval(cancelInterval)
            p.reject($this)
        }
    }
    

    $.fn.waitForIt = function(options) {
        var $this = $(this)
        var settings = $.extend(true, {}, defaultOptions, options)
        var runTime = 0
        var p = $.Deferred()

        var cancelInterval = setInterval(function($ele, settings, p) {
            runTime += settings.interval
            update($ele, settings, runTime, p, cancelInterval)
        }, settings.interval, $this, settings, p, cancelInterval)

        return p.promise()
    }
})(jQuery)





// testing it out
$('.invalid-class').remove()

$('.invalid-class')
    .waitForIt({timeout: 1000, interval: 10})
    .then(x => console.log('resolved: ', x), x => console.log('rejected: ', x))

setTimeout(function() {
    $('body').append($('<div />').addClass('invalid-class'))
    console.log('appended')
}, 1000)
