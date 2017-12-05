const http = require('http')
const port = 9006
let count = 0;
const requestHandler = (request, response) => {
  const { headers, method, url } = request;
  console.log(url);
  if (url == "/shoot") {
    response.statusCode = 200
    return response.end(++count+"")
  }
  if (url == "/prepare") {
    count = 0;
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
