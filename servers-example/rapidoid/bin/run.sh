#!/bin/bash
java -server -XX:+UseNUMA -XX:+UseParallelGC -XX:+AggressiveOpts -cp http-battle-rapidoid-1.1-jar-with-dependencies.jar httpbattle.Main profiles=production