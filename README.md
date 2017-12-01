# HTTP Battle

Launch the heat seekers! Release the swarm! Charge!

**HTTP Battle** is a simple **NodeJS** _script_ used to test (and compare) some web servers in a simple way.

In this repo you will find the script that is used to launch the tests and a `docker-compose.yml` example of how you could play with the runtime params.

We have developed this script to battle test 3 NodeJS and 2 Java and the results were, in a very very simplist local test:

1. [Java] SPARK **915** request/sec
2. [Node] NET **877** request/sec
3. [Node] HTTP **848** request/sec
4. [Node] FASTIFY **846** request/sec
5. [Java] NIO **832** request/sec
