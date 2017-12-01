const net = require('net');

const HOST = '0.0.0.0';
const PORT = 9005;
const HTTP_VERSION = "HTTP/1.1"
const CHARSET = "UTF-8"

let count = 0;
net.createServer(function(sock) {

    sock.on('data', function(data) {
        const content  = 'NET ' + ++count
        sock.write(`${HTTP_VERSION} 200 OK\r\n`)
        sock.write(`Date: ${new Date().toString()}\r\n`);
        sock.write("Server: NodeJS net Server v0.1\r\n");
        sock.write(`Content-Length: ${content.length}\r\n`);
        sock.write("\r\n");
        sock.end(content);
    });

    sock.on('close', function(data) {
      // console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('NET Server listening on ' + HOST +':'+ PORT);
