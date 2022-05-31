module.exports = function (RED) {
  "use strict";

  function BloockNode(n) {
    console.log(n, "n");
    RED.nodes.createNode(this, n);
    this.displayName = n.displayName;
  }

  RED.nodes.registerType("bloock-credentials", BloockNode, {
    credentials: {
      apikey: { type: "text" },
    },
  });

  RED.httpAdmin.get("/api.bloock.com/core/anchor/1", function (req, res) {
    console.log(req);
    if (!req.query.apikey) {
      res.send(400);
      return;
    }
    var node_id = req.query.id;
    var credentials = {
      apikey: req.query.apikey,
    };

    RED.nodes.addCredentials(node_id, credentials);
  });
};
