package tweetStream;

import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

public class KafkaConsumerForTweetStream {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumer.class);

    public static void main(String[] args) throws Exception {
        String kafkaBootstrapServers = System.getenv("KAFKA_BOOTSTRAP_SERVERS");
        String kafkaUsername = System.getenv("KAFKA_USERNAME");
        String kafkaPassword = System.getenv("KAFKA_PASSWORD");

        Properties props = new Properties();
        props.put("bootstrap.servers", kafkaBootstrapServers);
        props.put("sasl.mechanism", "SCRAM-SHA-256");
        props.put("security.protocol", "SASL_SSL");
        props.put("sasl.jaas.config", "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"" +
                kafkaUsername + "\" password=\"" + kafkaPassword + "\";");        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("auto.offset.reset", "earliest");
        props.put("group.id", "myGroupName");

        try(Consumer<String, String> consumer = new KafkaConsumer<String, String>(props)) {
            Set<String> topics = new HashSet<>();
            topics.add("myTwitterTopic");
            consumer.subscribe(topics);
            do {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
                for (Iterator<ConsumerRecord<String, String>> iter = records.iterator(); iter.hasNext(); ) {
                    ConsumerRecord<String, String> record = iter.next();
                    LOGGER.info(record.key() + ":" + record.value());
                }
            } while (true);
        }
    }
}
