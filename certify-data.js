const { BloockClient, Record } = require("@bloock/sdk");

module.exports = function (RED) {
  function certifyData(config) {
    RED.nodes.createNode(this, config);
    const apiKey = "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4";
    const client = new BloockClient(apiKey);
    let node = this;

    node.on("input", async function (msg) {
      let data = msg.payload;

      if (data) {
        if (typeof data == "string") {
          data = await Record.fromString(data);
        } else if (Buffer.isBuffer(data)) {
          data = await Record.fromTypedArray(data);
        } else if (typeof data == "object") {
          data = await Record.fromJSON(data);
        } else {
          console.log(`${typeof data} is not a valid type of data.`);
        }
      }

      client
        .sendRecords([data])
        .then((result) => {
          console.log(result)
          node.send({ anchor: result[0].anchor });
        })
        .catch((err) => {
          node.send(err);
          console.log(err)
        });
    });
  }
  RED.nodes.registerType("certifyData", certifyData);
};
