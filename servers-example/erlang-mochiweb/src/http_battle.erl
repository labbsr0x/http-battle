%% @author Mochi Media <dev@mochimedia.com>
%% @copyright 2010 Mochi Media <dev@mochimedia.com>

%% @doc http_battle.

-module(http_battle).
-author("Mochi Media <dev@mochimedia.com>").
-export([start/0, stop/0]).

ensure_started(App) ->
    case application:start(App) of
        ok ->
            ok;
        {error, {already_started, App}} ->
            ok
    end.


%% @spec start() -> ok
%% @doc Start the http_battle server.
start() ->
    http_battle_deps:ensure(),
    ensure_started(crypto),
    application:start(http_battle).


%% @spec stop() -> ok
%% @doc Stop the http_battle server.
stop() ->
    application:stop(http_battle).
