var $ptd = (function($ptd) {
    var $ptd = $ptd || {};

    $ptd.ajax = function(args) {
        request = new XMLHttpRequest();
        request.open(args.requestType, args.url, true);

        if (args.requestType === 'POST') {
            request.setRequestHeader('Content-Type', args.contentType || 'application/x-www-form-urlencoded');
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

        request.send(args.data);
    }

    return $ptd;
})($ptd);