const helper = require("node-red-node-test-helper");
const certifyDataNode = require("../certify-data.js");
const bloockNode = require("../bloock.js");

const credentials = {
  apikey: "",
};
const flow = [
  {
    id: "n1",
    type: "certify-data",
    name: "test data",
    wires: [["n2"]],
  },
  {
    id: "n2",
    type: "helper",
  },
];

describe("certify-data Node", function () {
  afterEach(function () {
    helper.unload();
  });

  it("should have credentials", function (done) {
    helper.load([certifyDataNode, bloockNode], flow, credentials, function () {
      const n1 = helper.getNode("n1");
      n1.credentials.should.have.property("name", "test data");
      done();
    });
  });

  it("should certify data", function (done) {
    try {
      helper.load(
        [certifyDataNode, bloockNode],
        flow,
        credentials,
        function () {
          const n2 = helper.getNode("n2");
          const n1 = helper.getNode("n1");
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
