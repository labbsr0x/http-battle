%% @author Mochi Media <dev@mochimedia.com>
%% @copyright 2010 Mochi Media <dev@mochimedia.com>

%% @doc Web server for http_battle.

-module(http_battle_web).
-author("Mochi Media <dev@mochimedia.com>").

-export([start/1, stop/0, loop/3]).

%% External API

start(Options) ->
    {DocRoot, Options1} = get_option(docroot, Options),
    Loop = fun (Req) ->
           ?MODULE:loop(Req, DocRoot, 0)
    end,
    mochiweb_http:start([{name, ?MODULE}, {loop, Loop} | Options1]).

stop() ->
    mochiweb_http:stop(?MODULE).

loop(Req, DocRoot, Count) ->
    "/" ++ Path = Req:get(path),
    try
        case Req:get(method) of
            Method when Method =:= 'OPTIONS'; Method =:= 'HEAD' ->
                Req:respond({204, [], []});
            'GET' ->
                NewCount = case Path of
                    "prepare" ->
                      0;
                    "shoot" ->
                      Count + 1;
                    _ ->
                        Req:not_found(),
                        -1
                end,
                Req:respond({200, [{"Content-Type", "text/plain"}],
                integer_to_list(NewCount)}),
                loop(Req, DocRoot, NewCount);
            _ ->
                Req:respond({501, [], []})
        end
    catch
        Type:What ->
            Report = ["web request failed",
                      {path, Path},
                      {type, Type}, {what, What},
                      {trace, erlang:get_stacktrace()}],
            error_logger:error_report(Report),
            Req:respond({500, [{"Content-Type", "text/plain"}],
                         "request failed, sorry\n"})
    end.

%% Internal API

get_option(Option, Options) ->
    {proplists:get_value(Option, Options), proplists:delete(Option, Options)}.

%%
%% Tests
%%
-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").

you_should_write_a_test() ->
    ?assertEqual(
       "No, but I will!",
       "Have you written any tests?"),
    ok.

-endif.
