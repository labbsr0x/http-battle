# HTTP Battle

Launch the heat seekers! Release the swarm! Charge!

**HTTP Battle** is a tiny **NodeJS** _script_ used to test (and compare) some web servers in a simple way.

In this repo you will find the script that is used to launch the tests and a `docker-compose.yml` example of how you could play with the runtime params.

We have developed this script to battle test 3 NodeJS and 2 Java and the results were, in a very very simplist local test:

1. [Java] SPARK **935** request/sec
2. [Node] NET **918** request/sec
3. [Java] NIO **910** request/sec
4. [Node] HTTP **884** request/sec
5. [Node] FASTIFY **873** request/sec


## Requirements

If you want to put a server on the battlefield you should provide 2 endpoints as follows:

* `/prepare` - to reset the internal request counter
* `/shoot` - to increment the counter and return *only* its current value