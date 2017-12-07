package httpbattle;

import org.rapidoid.buffer.Buf;
import org.rapidoid.http.AbstractHttpServer;
import org.rapidoid.http.HttpStatus;
import org.rapidoid.http.HttpUtils;
import org.rapidoid.http.MediaType;
import org.rapidoid.net.abstracts.Channel;
import org.rapidoid.net.impl.RapidoidHelper;

import java.util.concurrent.atomic.AtomicInteger;

public class PlaintextAndJsonServer extends AbstractHttpServer {

    private static final byte[] URI_SHOOT = "/shoot".getBytes();
    private static final byte[] URI_PREPARE = "/prepare".getBytes();
    private AtomicInteger counter = new AtomicInteger();

    public PlaintextAndJsonServer() {
        super("X", "", "", false);
    }

    @Override
    protected HttpStatus handle(Channel ctx, Buf buf, RapidoidHelper data) {
        if (matches(buf, data.path, URI_SHOOT)) {
            return ok(ctx, data.isKeepAlive.value, (counter.incrementAndGet()+"").getBytes(), MediaType.TEXT_PLAIN);
            //return serializeToJson(HttpUtils.noReq(), ctx, data.isKeepAlive.value, counter.incrementAndGet());
        } else if (matches(buf, data.path, URI_PREPARE)) {
            counter.set(0);
            return ok(ctx, data.isKeepAlive.value, Integer.valueOf(counter.get()).toString().getBytes(), MediaType.TEXT_PLAIN);
        }
        return HttpStatus.NOT_FOUND;
    }

}
