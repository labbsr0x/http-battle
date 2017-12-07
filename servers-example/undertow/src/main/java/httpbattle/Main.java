package httpbattle;

import io.undertow.Undertow;
import io.undertow.UndertowOptions;
import io.undertow.server.HttpServerExchange;
import io.undertow.server.handlers.PathHandler;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {

    public static void main(String[] args) throws Exception {

        AtomicInteger counter = new AtomicInteger();

        Undertow.builder()
            .addHttpListener(8080, "0.0.0.0")
            .setServerOption(UndertowOptions.ALWAYS_SET_KEEP_ALIVE, false)
            .setHandler(new PathHandler()
                    .addExactPath(
                        "/prepare",
                            (HttpServerExchange exchange) -> {
                                //exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
                                counter.set(0);
                                exchange.getResponseSender().send(counter.get()+"");
                            }
                    )
                    .addExactPath(
                        "/shoot",
                        (HttpServerExchange exchange) -> {
                            //exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
                            exchange.getResponseSender().send(counter.incrementAndGet()+"");
                        }
                    )
            ).build()
        .start();
    }
}
