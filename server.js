var http = require('http');
console.log(“server running...”);
http.createServer(function (req, res) {
console.log('request received');
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('_testcb(\'{"message": "Hello world!"}\')');
}).listen(80);