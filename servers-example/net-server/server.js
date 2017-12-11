const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const net = require('net');

const HOST = '0.0.0.0';
const PORT = 9005;
const HTTP_VERSION = "HTTP/1.1"
const CHARSET = "UTF-8"

let nextPrepareTime = null

let count = 0;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    net.createServer(function(sock) {

        sock.on('data', function(data) {                
            const currentData = data.toString('ascii').split(/(?:\r\n|\r|\n)/g);
            let content = ""
            if (currentData[0].indexOf('/shoot') != -1) {
                content  = ++count+""
                sock.write(`${HTTP_VERSION} 200 OK\r\n`)
                sock.write('Access-Control-Allow-Origin: *\r\n');
                sock.write('Access-Control-Allow-Credentials: true\r\n');
                sock.write('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n');
                sock.write('Access-Control-Allow-Headers: Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With\r\n');    
                sock.write(`Date: ${new Date().toString()}\r\n`);
                sock.write("Server: NodeJS net Server v0.1\r\n");
                sock.write(`Content-Length: ${content.length}\r\n`);
                sock.write("\r\n");
                return sock.end(content);
            }
            if (currentData[0].indexOf('/prepare') != -1) {
                if (currentData[0].indexOf('reset_time') != -1) {
                    nextPrepareTime = parseInt(currentData[0].substring(currentData[0].indexOf("reset_time") + "reset_time=".length))
                }else{
                    count = 0
                }
                content = "SCHEDULED " + count
                sock.write(`${HTTP_VERSION} 200 OK\r\n`)
                sock.write('Access-Control-Allow-Origin: *\r\n');
                sock.write('Access-Control-Allow-Credentials: true\r\n');
                sock.write('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n');
                sock.write('Access-Control-Allow-Headers: Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With\r\n');    
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
            sock.write('Access-Control-Allow-Origin: *\r\n');
            sock.write('Access-Control-Allow-Credentials: true\r\n');
            sock.write('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n');
            sock.write('Access-Control-Allow-Headers: Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With\r\n');
        
            sock.write("\r\n");
            sock.end(content);

        });

        sock.on('close', function(data) {
        // console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        });

    }).listen(PORT, HOST);

    console.log('NET Server listening on ' + HOST +':'+ PORT);


    //reset counter on a specified date
    setInterval(() => {

        if (nextPrepareTime && nextPrepareTime != null && parseInt(new Date().getTime()) > parseInt(new Date(parseInt(nextPrepareTime)).getTime())) {
            console.log('resetPrepare', nextPrepareTime);
            nextPrepareTime = null
            count = 0;
        }

    }, 1)
}