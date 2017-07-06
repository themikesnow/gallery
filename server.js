
var express = require('express');
var http = require('http');
var proxy = require('http-proxy-middleware');

var app = express();

var port = process.env.PORT || 3000;
var host = process.env.HOST || "127.0.0.1";


app.get('*', function(req, res) {
  // res.sendFile(__dirname + '/public/index.html');
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static(__dirname + '/dist'));
// app.use('/api', proxy({target: 'http://localhost:9007', changeOrigin: true, pathRewrite: {'^/api' : '/rest'}}));
// app.use('/authentication', proxy({target: 'http://localhost:9007', changeOrigin: true, pathRewrite: {'^/authentication' : '/login'}}));

app.listen(port);

console.log('Cute files is running on port ' + port);