var redirectToWww = function () {
    return function (req, res, next) {
        var host = req.get('host'),                 // req.get('host') contains port number as well
            hostname = req.hostname;                // req.hostname doesn't contain port number
        var wwwFound = hostname.match(/^www\./i),
            dotFound = hostname.match(/\./),
            isLikelyAnIpAddress = hostname.match(/^[\d]+\.[\d]+\.[\d]+\.[\d]+$/);   // A simple check (also satisfies number beyond IP address range, but it should be fine for normal use-cases)
        if (!wwwFound && dotFound && !isLikelyAnIpAddress) {
            var redirectToUrl = req.protocol + '://' + 'www.' + host + req.originalUrl;
            return res.redirect(301, redirectToUrl);
        }
        next();
    };
};
module.exports = redirectToWww;
