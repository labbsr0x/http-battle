const fastify = require('fastify')()

let count = 0;
fastify.get('/*', function (request, reply) {
  // console.log(count);
  reply.send('FASTIFY ' + ++count)
})

fastify.listen(9007, function (err) {
  if (err) throw err
  console.log(`FASTIFY server listening on ${fastify.server.address().port}`)
})
