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
    var $this = $(settings.selector)
    if(settings.resolveCheck($this, settings, runTime)) {
      clearInterval(cancelInterval)
      p.resolve($this)
    }
    else if(settings.timeout >= 0 && settings.rejectCheck($this, settings, runTime)) {
      clearInterval(cancelInterval)
      p.reject($this)
    }
  }


  $.fn.waitForIt = function(options) {
    var $this = $(this)
    defaultOptions.selector = $this.selector
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




