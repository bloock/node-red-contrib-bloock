const { BloockClient, Record } = require("@bloock/sdk");

module.exports = function (RED) {
  "use strict";

  function certifyData(n) {
    RED.nodes.createNode(this, n);
    let node = this;

    const apikey = this.credentials.apikey;

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

      if (apikey) {
        const client = new BloockClient(apikey);
        client
          .sendRecords([data])
          .then((result) => {
            node.status({
              fill: "green",
              shape: "dot",
              text: "Data successfully submitted",
            });
            node.send({ anchor: result[0].anchor });
          })
          .catch((err) => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "Data could not be submitted",
            });
            node.send({ err });
          });
      } else {
        node.status({
          fill: "red",
          shape: "ring",
          text: "No API key provided",
        });

        node.send("Please introduce an API Key");
        return null;
      }
    });
  }
  RED.nodes.registerType("certifyData", certifyData, {
    credentials: {
      apikey: { type: "password" },
    },
  });
};
