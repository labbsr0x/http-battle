const net = require('net');

const HOST = '0.0.0.0';
const PORT = 9005;
const HTTP_VERSION = "HTTP/1.1"
const CHARSET = "UTF-8"

let count = 0;
net.createServer(function(sock) {

    sock.on('data', function(data) {                
        const currentData = data.toString('ascii').split(/(?:\r\n|\r|\n)/g);
        let content = ""
        if (currentData[0].indexOf('/shoot') != -1) {
            content  = ++count+""
            sock.write(`${HTTP_VERSION} 200 OK\r\n`)
            sock.write(`Date: ${new Date().toString()}\r\n`);
            sock.write("Server: NodeJS net Server v0.1\r\n");
            sock.write(`Content-Length: ${content.length}\r\n`);
            sock.write("\r\n");
            return sock.end(content);
        }
        if (currentData[0].indexOf('/prepare') != -1) {
            count = 0
            content = "SCHEDULED " + count
            sock.write(`${HTTP_VERSION} 200 OK\r\n`)
            sock.write(`Date: ${new Date().toString()}\r\n`);
            sock.write("Server: NodeJS net Server v0.1\r\n");
            sock.write(`Content-Length: ${content.length}\r\n`);
            sock.write("\r\n");
            return sock.end(content);
        }

        content = "NOT FOUND"
        sock.write(`${HTTP_VERSION} 404 NOT FOUND\r\n`)
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
