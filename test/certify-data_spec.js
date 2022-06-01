const helper = require("node-red-node-test-helper");
const certifyDataNode = require("../certify-data.js");

afterEach(function () {
  helper.unload();
});
// separat secret credentials object to be passed in at launch, adhering to how nodered protects secrets

const credentials = {
  apikey: "",
};

// the way nodered wants to define flows and relations, and initial values
const flow = [
  {
    id: "n1",
    type: "certifyData",
    displayName: "test data",
    apikey: "",
    wires: [["n2"]],
  },
  {
    id: "n2",
    type: "helper",
  },
];

describe("Node load with config", function () {
  // node should be loaded fine in the runtime
  it("should be loaded", function (done) {
    helper.load([certifyDataNode], flow, credentials, function () {
      const n1 = helper.getNode("n1");
      n1.should.have.property("displayName", "test data");
      done();
    });
  });

  // Node should have needed credentials
  it("should have credentials", function (done) {
    helper.load([certifyDataNode], flow, credentials, function () {
      const n1 = helper.getNode("n1");
      n1.credentials.should.have.property("apikey", "");
      done();
    });
  });
});

describe("Node certifying data", function () {
  //node should certify data
  it("should certify data", function (done) {
    try {
      helper.load([certifyDataNode], flow, credentials, function () {
        const n1 = helper.getNode("n1");
        const n2 = helper.getNode("n2");
        n2.on("input", function (msg) {
          msg.payload.should.have.property("error", false);
          msg.should.have.property("payload", "timestamp");
          done();
        });
        n1.receive({
          payload: "data",
        });
      });
    } catch (error) {
      console.log("Certification failed", error);
    }
  });
});
