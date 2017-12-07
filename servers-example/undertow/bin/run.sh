#!/bin/bash
java -server -XX:+UseNUMA -XX:+UseParallelGC -XX:+AggressiveOpts -cp undertow-1.0-jar-with-dependencies.jar httpbattle.Main
