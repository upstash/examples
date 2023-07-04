"use strict";
const fetch = require('axios').default;

module.exports.hello = async (event) => {
    let start = new Date();
    const msg = "Hello"
    const address = "https://REPLACE_YOUR_ENDPOINT"
    const user = 'REPLACE YOUR USERNAME'
    const pass = 'REPLACE YOUR PASSWORD'
    const auth = Buffer.from(`${user}:${pass}`).toString('base64')
    const response = await fetch(`${address}/produce/newtopic/${msg}}`, {
        headers: {
            Authorization: `Basic ${auth}`
        }
    });
    let latency = (new Date()) - start;
    const res = response.data

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                header: "Pushed this message to Upstash Kafka with REST API!",
                message: msg,
                response: res,
                latency: latency,
            },
            null,
            2
        ),
    };
};

