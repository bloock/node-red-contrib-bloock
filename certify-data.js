const { BloockClient, Record } = require("@bloock/sdk");

module.exports = function (RED) {
  function certifyData(config) {
    RED.nodes.createNode(this, config);
    this.bloock = RED.nodes.getNode(n.bloock);

    if (!this.bloock || !this.bloock.credentials.apikey) {
      this.warn(RED._("Previous authentication is required"));
      return;
    }

    const apiKey = "";
    const client = this.bloock.credentials.apikey && new BloockClient(apiKey);
    let node = this;

    node.on("input", function (msg) {
      let data = msg.payload;
      if (data) {
        switch (typeof data) {
          case "string":
            data = Record.fromString(data);
            break;
          case "object":
            data = Record.fromJSON(JSON.parse(data));
            break;
          case "array":
            data = Record.fromTypedArray(data);
            break;
          default:
            console.log(`${typeof data} is not a valid type of data.`);
        }
      }

      let preparedData = client.sendRecords(data).then((result) => {
        return { anchor: result[0].anchor };
      });

      msg.payload = preparedData;
      node.send(msg);
    });
  }
  RED.nodes.registerType("certify-data", certifyData);
};
