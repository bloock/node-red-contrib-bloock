module.exports = function (RED) {
  "use strict";
  const request = require("request");

  function BloockCredentialsNode(n) {
    RED.nodes.createNode(this, n);
    this.displayName = n.displayName;
    let node = this;

  

  node.on("input", async function (msg) {
    console.log(msg)
    console.log(this.bloock, "arriba el node de bloock?")      
    console.log(n, "n")

    node.send(msg)
  })
  }
  RED.nodes.registerType("bloockCredentials", BloockCredentialsNode);
}

  /*  bloockCredentials.prototype.request = function (req, cb) {
    let node = this;

    if (typeof req !== "object") {
      req = { url: req };
    }
    req.method = req.method || "GET";
    if (!req.hasOwnProperty("json")) {
      req.json = true;
    }
    req.auth = { bearer: this.credentials.apikey };
  };

  RED.httpAdmin.get("/bloockCredentials/auth", function (req, res) {

    if (!req.query.apikey) {
      res.send(400);
      return;
    }
    var node_id = req.query.id;
    const credentials = {
      apikey: req.query.apikey,
    };

    RED.nodes.addCredentials(node_id, credentials);
  });

  request.get(
    {
      url: "https://api.bloock.com/core/anchor/1",
      json: true,
      auth: { X_API_KEY: credentials.apikey },
    },
    function (err, result, data) {
      if (err) {
        console.log("request error:" + err);
        return res.send(RED._("authentication failed"));
      }
      if (data.error) {
        console.log("oauth error: " + data.error);
        return res.send(RED._("authentication failed"));
      }
      credentials.apikey = data.apikey;

      credentials.displayName = data.displayName;
      res.send(RED._("Authentication successful"));
      RED.nodes.addCredentials(node_id, credentials);
    }
  );
 */





/* 
function bloockApiConfig(n) {
    RED.nodes.createNode(this, n);
    this.displayName = n.displayName;
  }

  RED.nodes.registerType("bloockApiConfig", bloockApiConfig, {
    credentials: {
      apikey: { type: "password" },
    },
  });


bloockApiConfig.prototype.request = function(req, cb) {
    if (typeof req !== 'object') {
        req = { url: req };
    }
    req.method = req.method || 'GET';
    if (!req.hasOwnProperty("json")) {
        req.json = true;
    }
    if (!req.qs) {
        req.qs = {};
    }
    req.qs.apikey = this.credentials.apikey;
    return request(req, function(err, result, data) {
        console.log(this.credentials.apikey,"fsfdrf")
        if (err) {
            return cb(err.toString(), null);
        }
        if (result.statusCode >= 400) {
            return cb(RED._("httperror", {statusCode: result.statusCode}), data);
        }
        if (data && data.status !== 'OK') {
            var error = RED._("api error", {status: data.status});
            if (data.error_message) {
                error += ": " + data.error_message;
            }
            return cb(error, data);
        }
        return cb(null, data);
    });
};

 */