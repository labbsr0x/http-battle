const http = require('http')
const port = 9006
let count = 0;
const requestHandler = (request, response) => {
  response.end('HTTP ' + ++count)
  // console.log(count);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`HTTP server is listening on ${port}`)
})
