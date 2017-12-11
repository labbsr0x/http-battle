const http = require('http')
const urlParser = require('url');

const port = 9006
let count = 0;
let nextPrepareTime = null

const requestHandler = (request, response) => {
  const { headers, method, url } = request;

  if (url == "/shoot") {
    response.statusCode = 200
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With');
    return response.end(++count+"")
  }
  if (url.indexOf("/prepare") != -1) {
    const queryObject = urlParser.parse(url, true).query;
    if (queryObject.reset_time) {
      console.log('reset_time', queryObject.reset_time);
      nextPrepareTime = queryObject.reset_time

    } else {
      console.log('count 0');
      count = 0;

    }
    response.statusCode = 200
    return response.end("Scheduled")
  }
  response.statusCode = 404
  response.end(`<div style="text-align: center; font-family: sans-serif"><h1>The bridges are burning! Back to the lab!</h1><h2 style="opacity: .25">error 404</h2></div>`)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`HTTP server is listening on ${port}`)
})

//reset counter on a specified date
setInterval(() => {

  if (nextPrepareTime && nextPrepareTime != null && parseInt(new Date().getTime()) > parseInt(new Date(parseInt(nextPrepareTime)).getTime())) {
    console.log('resetPrepare', nextPrepareTime);
    nextPrepareTime = null
    count = 0;
  }

}, 1)
