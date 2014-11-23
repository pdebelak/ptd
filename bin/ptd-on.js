var $ptd = (function($ptd) {
    var $ptd = $ptd || {};
    
    $ptd.on = function(eventType, selector, delegate, callback) {
        // this is to implement a jquery-style 'on' with a delegate for dynamically added content
        var list = document.querySelectorAll(selector);
        for (var i=0; i<list.length; i++) {
            list[i].addEventListener(eventType, function(event) {
                // note to browser developers: implement matches!
                if(event.target.matches) {
                    if(event.target.matches(delegate)) {
                        callback(event);
                    }
                } else if (event.target.msMatchesSelector) {
                    if(event.target.msMatchesSelector(delegate)) {
                        callback(event);
                    }
                } else if (event.target.webkitMatchesSelector) {
                    if(event.target.webkitMatchesSelector(delegate)) {
                        callback(event);
                    }
                } else if (event.target.mozMatchesSelector) {
                    if(event.target.mozMatchesSelector(delegate)) {
                        callback(event);
                    }
                }
            });
        }
    }

    return $ptd;
})($ptd);