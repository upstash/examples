exports.handler = async (event) => {
  if (!event.records) {
    return { response: "no kafka event" };
  }

  for (const messages of Object.values(event.records)) {
    for (const msg of messages) {
      const buff = Buffer.from(msg.value, "base64");
      const text = buff.toString("ascii");
      // process the message
      console.log(text);
    }
  }

  return { response: "success" };
};
