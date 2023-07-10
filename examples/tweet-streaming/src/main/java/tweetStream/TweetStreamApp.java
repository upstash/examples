package tweetStream;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.concurrent.ExecutionException;

public class TweetStreamApp implements RequestHandler {
    @Override
    public String handleRequest(Object input, Context context) {
        TwitterProducer twitterProducer = new TwitterProducer("morning");
        try {
            twitterProducer.run();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
}