from aiokafka import AIOKafkaConsumer
from aiokafka.helpers import create_ssl_context
import asyncio

async def send_one():
    consumer = AIOKafkaConsumer(
        "test", # This is the topic id/name
        bootstrap_servers='<CONNECTION LINK>',
        ssl_context=create_ssl_context(),
        sasl_mechanism='SCRAM-SHA-256',
        security_protocol='SASL_SSL',
        sasl_plain_username='<USERNAME>',
        sasl_plain_password='<PASSWORD>',
        auto_offset_reset="earliest",
        group_id='$GROUP_NAME'
        )
    # Get cluster layout and initial topic/partition leadership information
    await consumer.start()
    try:
        async for msg in consumer:
            print(
                "{}:{:d}:{:d}: key={} value={} timestamp_ms={}".format(
                    msg.topic, msg.partition, msg.offset, msg.key, msg.value,
                    msg.timestamp)
            )
    finally:
        await consumer.stop()

asyncio.run(send_one())

