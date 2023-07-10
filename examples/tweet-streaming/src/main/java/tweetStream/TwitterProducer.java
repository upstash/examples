package tweetStream;

import io.github.redouane59.twitter.TwitterClient;
import io.github.redouane59.twitter.dto.endpoints.AdditionalParameters;
import io.github.redouane59.twitter.dto.tweet.TweetList;
import io.github.redouane59.twitter.dto.tweet.TweetV2;
import io.github.redouane59.twitter.helpers.ConverterHelper;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import org.apache.kafka.clients.producer.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ExecutionException;


public class TwitterProducer {
    private static final Logger LOGGER = LoggerFactory.getLogger(TwitterProducer.class);

    private KafkaProducer<String, String> producer;
    private final String bearerToken;
    private final TwitterClient twitterClient;
    private final String keyword;
    private final String kafkaBootstrapServers;
    private final String kafkaUsername;
    private final String kafkaPassword;

    public TwitterProducer(String keyword){
        bearerToken = System.getenv("BEARER_TOKEN");
        kafkaBootstrapServers = System.getenv("KAFKA_BOOTSTRAP_SERVERS");
        kafkaUsername = System.getenv("KAFKA_USERNAME");
        kafkaPassword = System.getenv("KAFKA_PASSWORD");

        twitterClient = new TwitterClient(TwitterCredentials.builder()
                .bearerToken(bearerToken)
                .build());
        this.keyword = keyword;
    }

    //Kafka Producer
    private KafkaProducer<String, String> createKafkaProducer() {
        // Create producer properties
        // This block is provided in Upstash UI
        Properties props = new Properties();
        props.put("bootstrap.servers", kafkaBootstrapServers);
        props.put("sasl.mechanism", "SCRAM-SHA-256");
        props.put("security.protocol", "SASL_SSL");
        props.put("sasl.jaas.config", "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"" +
                kafkaUsername + "\" password=\"" + kafkaPassword + "\";");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Create producer
        return new KafkaProducer<String, String>(props);
    }

    public void run() throws ExecutionException, InterruptedException {
        // Kafka Producer
        producer = createKafkaProducer();

        TweetList result = twitterClient.searchTweets(keyword, AdditionalParameters.builder()
                .startTime(ConverterHelper.minutesBeforeNow(15))
                        .recursiveCall(false)
                        .build());

        List<TweetV2.TweetData> tweetDataList = result.getData();

        for (Iterator i = tweetDataList.iterator(); i.hasNext(); ){
            TweetV2.TweetData tweet = (TweetV2.TweetData)i.next();
            LOGGER.info("Tweet Data: " + tweet.getText());
            producer.send(new ProducerRecord<>("myTwitterTopic", null, tweet.getText())).get();
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        new tweetStream.TwitterProducer("morning").run();
    }
}
