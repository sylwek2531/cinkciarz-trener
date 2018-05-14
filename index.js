'use strict';
var http = require('http');
var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
var config = {
    backendUrl: process.env.PROXY || 'http://localhost:3000', port: process.env.PORT || 8000,
};
app.use('/api', proxy({target: config.backendUrl, changeOrigin: true}));
app.use('/', express.static(__dirname + '/app'));
app.get('*', function (req, res)
{
    res.sendFile(__dirname + '/app/index.html');
});
var httpListener = http.createServer(app).listen(config.port, function ()
{
    console.info('listening on port', httpListener.address().port);
});
