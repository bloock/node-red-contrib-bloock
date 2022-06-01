const { BloockClient, Record } = require("@bloock/sdk");

module.exports = function (RED) {
  function certifyData(config) {
    RED.nodes.createNode(this, config);
    const apiKey = process.env.API_KEY;
    const client = new BloockClient(apiKey);
    let node = this;

    node.on("input", async function (msg) {
      let data = config.data;

      if (data) {
        switch (typeof data) {
          case "string":
            console.log("string");
            data = await Record.fromString(data);
            break;
          case "object":
            console.log("object");
            data = await Record.fromJSON(JSON.parse(data));
            break;
          case "array":
            console.log("array");
            data = await Record.fromTypedArray(data);
            break;
          default:
            console.log(`${typeof data} is not a valid type of data.`);
        }
      }

      client
        .sendRecords([data])
        .then((result) => {
          node.send({ anchor: result[0].anchor });
        })
        .catch((err) => {
          node.send(err);
        });
    });
  }
  RED.nodes.registerType("certifyData", certifyData);
};
