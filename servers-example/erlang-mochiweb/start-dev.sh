#!/bin/sh
exec erl \
    -pa ebin deps/*/ebin \
    -boot start_sasl \
    -sname http_battle_dev \
    -s http_battle \
    -s reloader
