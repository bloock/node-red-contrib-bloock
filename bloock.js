module.exports = function (RED) {
  "use strict";
  var request = require("request");

  function BloockNode(n) {
    RED.nodes.createNode(this, n);
    console.log(this, "this");
    console.log(n, "n");
    this.displayName = n.displayName;
    this.eventEmitter = new events();
  }
  GoogleNode.prototype.request = function (req, cb) {
    console.log(req, cb);
    var node = this;
    console.log(node);
  };
  RED.nodes.registerType("bloockCredentials", BloockNode, {
    credentials: {
      key: { type: "password" },
    },
  });
};
