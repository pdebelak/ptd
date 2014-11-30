var $ptd = (function($ptd) {
    var $ptd = $ptd || {};

    $ptd.ajax = function(args) {
        request = new XMLHttpRequest();
        request.open(args.requestType, args.url, true);

        if (args.contentType) {
            request.setRequestHeader('Content-Type', args.contentType);
        }

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                return args.success(request);
            } else {
                if (args.problem) {
                    return args.problem(request);
                }
            }
        };

        if (args.error) {
            request.onerror = function() {
                return args.error(request);
            }
        };


        function parseData(anObject) {
            var string = '';
            for (var key in anObject) {
                if (anObject.hasOwnProperty(key)) {
                    string += key + '=' + anObject[key] + '&';
                }
            }
            // removes the final unneeded &
            string = string.substring(0, string.length - 1);
            return string;
        }

        // passing in a form element only works in IE 10+, so make sure that is okay or you have a back-up plan
        var data = args.data instanceof Element ? new FormData(args.data) : typeof args.data === 'object' ? parseData(args.data) : args.data;

        request.send(data);
    }

    return $ptd;
})($ptd);