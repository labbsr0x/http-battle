const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const fastify = require('fastify')()

let count = 0;
let nextPrepareTime = null


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
  fastify.get('/prepare', function (request, reply) {
    console.log('request.query', request.query);
    
    if (request.query.reset_time) {
      console.log('reset_time', request.query.reset_time);
      
      nextPrepareTime = request.query.reset_time
    }else{
      console.log('count 0');
      
      count = 0;
    }
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

  //reset counter on a specified date
  setInterval(() => {  
    
    if ( nextPrepareTime && nextPrepareTime != null && parseInt(new Date().getTime()) > parseInt(new Date(parseInt(nextPrepareTime)).getTime()) ) {
      console.log('resetPrepare', nextPrepareTime);
      nextPrepareTime = null
      count = 0;
    }

  },1)

}