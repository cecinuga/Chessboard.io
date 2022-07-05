const Greeter = artifacts.require("Greeter");

module.exports = function (deployer) {
  deployer.deploy(Greeter, '0xC817494c318EDf654C0ee0Ee8294f53B6f4878fa', '0x92898dC274F6BBc0e9C94d1Cf6387e05bA03B711');
};