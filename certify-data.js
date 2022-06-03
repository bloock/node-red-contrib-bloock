const { BloockClient, Record } = require("@bloock/sdk");

module.exports = function (RED) {
  function certifyData(config) {
    RED.nodes.createNode(this, config);
    const apiKey = "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4";
    const client = new BloockClient(apiKey);
    let node = this;

    node.on("input", async function (msg) {
      let data = config.data;

      if (data) {
        switch (typeof data) {
          case "string":
            data = await Record.fromString(data);
            break;
          case "object":
            data = await Record.fromJSON(JSON.parse(data));
            break;
          case "array":
            data = await Record.fromTypedArray(data);
            break;
          default:
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
