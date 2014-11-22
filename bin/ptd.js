"use strict";

var $ptd = (function($ptd) {
    var $ptd = $ptd || {};

    $ptd.ready = function(callback) {
        // apologies to jquery - http://jquery.org/
        var dcl = function() {
          document.removeEventListener("DOMContentLoaded", dcl);
          callback();
        }

        if(document.readyState === "complete") {
          // document is already ready (already)
          callback();
        } else {
          document.addEventListener("DOMContentLoaded", dcl);
        }
    }

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
})($ptd)