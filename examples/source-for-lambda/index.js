exports.handler = async (event) => {

    if(!event.records) {
        return {response : "no kafka event"};
    }

    for(let messages of Object.values(event.records)) {
        for(let msg of messages) {
            let buff = Buffer.from(msg.value, 'base64');
            let text = buff.toString('ascii');
            // process the message
            console.log(text);
        }
    }

    return {response : "success" };
};