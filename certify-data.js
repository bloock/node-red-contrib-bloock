const { BloockClient, Record } = require("@bloock/sdk");
const request = require('request');

module.exports = function (RED) {
  "use strict";

  function certifyData(n) {
    RED.nodes.createNode(this, n);

    this.bloock = RED.nodes.getNode(n.bloock);        

/*     if (!this.bloock || !this.bloock.credentials.apikey) {
      this.warn(RED._("No credentials found"));
      return;
  }
     */

/*     this.bloock = RED.nodes.getNode(config);  
 */    /*  if (!this.bloock || !this.bloock.key) {
      this.warn(RED._("error"));
      return;
    }
    */
   const apiKey = "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4";
   const client = new BloockClient(apiKey);
   let node = this;
   
   node.on("input", async function (msg) {
     console.log(msg)
     console.log(this.bloock, "arriba el node de bloock?")      
     let data = msg.payload;
     console.log(n, "n")


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
