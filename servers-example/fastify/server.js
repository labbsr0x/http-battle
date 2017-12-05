const fastify = require('fastify')()

let count = 0;
fastify.get('/prepare', function (request, reply) {
  count = 0;
  reply.send("Scheduled " + count)
})
fastify.get('/shoot', function (request, reply) {
  reply.send(++count)
})

fastify.listen(9007, function (err) {
  if (err) throw err
  console.log(`FASTIFY server listening on ${fastify.server.address().port}`)
})
