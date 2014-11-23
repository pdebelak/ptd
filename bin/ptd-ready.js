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

    return $ptd;
})($ptd);