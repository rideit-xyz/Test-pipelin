var http = require('http');
var globalTunnel = require('global-tunnel');
globalTunnel.initialize();
http.get({
        host: 'https://www.google.be',
        path: '/',
        port:'80',
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            console.log(body);            
        });
    });