const helper = require("node-red-node-test-helper");
const certifyDataNode = require("../certify-data.js");
const bloockNode = require("../bloock.js");

afterEach(function () {
  helper.unload();
});
// separat secret credentials object to be passed in at launch, adhering to how nodered protects secrets


console.log(process.env.API_KEY)

const credentials = {
  apikey:
    "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4",
};

// the way nodered wants to define flows and relations, and initial values
const flow = [
  {
    id: "n1",
    type: "certify-data",
    displayName: "test data",
    apikey:
      "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4",
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
    helper.load([certifyDataNode, bloockNode], flow, credentials, function () {
      console.log("h");
      const n1 = helper.getNode("n1");
      n1.should.have.property("displayName", "test data");
      done();
    });
  });

  // Node should have needed credentials
  it("should have credentials", function (done) {
    console.log("he");

    helper.load([certifyDataNode, bloockNode], flow, credentials, function () {
      const n1 = helper.getNode("n1");
      console.log(n1, "es aioc?");
      n1.credentials.should.have.property(
        "apikey",
        "test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4"
      );
      console.log("df")
      done();
    });
  });
});

describe("Node certifying data", function () {
  //node should certify data
  it("should certify data", function (done) {
    console.log("hel");

    try {
      console.log("hell");

      helper.load(
        [certifyDataNode, bloockNode],
        flow,
        credentials,
        function () {
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
        }
      );
    } catch (error) {
      console.log("Certification failed", error);
    }
  });
});
