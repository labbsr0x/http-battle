const fastify = require('fastify')()

let count = 0;
fastify.get('/prepare', function (request, reply) {
  count = 0;
  reply.send("Scheduled " + count)
})
fastify.get('/shoot', function (request, reply) {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Credentials', 'true');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With');
  reply.send(++count)
})

fastify.listen(9007, function (err) {
  if (err) throw err
  console.log(`FASTIFY server listening on ${fastify.server.address().port}`)
})
