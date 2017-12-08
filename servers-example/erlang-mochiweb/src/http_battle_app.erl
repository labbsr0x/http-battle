%% @author Mochi Media <dev@mochimedia.com>
%% @copyright http_battle Mochi Media <dev@mochimedia.com>

%% @doc Callbacks for the http_battle application.

-module(http_battle_app).
-author("Mochi Media <dev@mochimedia.com>").

-behaviour(application).
-export([start/2,stop/1]).


%% @spec start(_Type, _StartArgs) -> ServerRet
%% @doc application start callback for http_battle.
start(_Type, _StartArgs) ->
    http_battle_deps:ensure(),
    http_battle_sup:start_link().

%% @spec stop(_State) -> ServerRet
%% @doc application stop callback for http_battle.
stop(_State) ->
    ok.
