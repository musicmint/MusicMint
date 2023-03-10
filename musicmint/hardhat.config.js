// require("@nomicfoundation/hardhat-toolbox");
//
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
//   paths: {
//     artifacts: "./musicmint/artifacts",
//     sources: "./musicmint/contracts",
//     cache: "./musicmint/cache",
//     tests: "./musicmint/test"
//   },
// };

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "artifacts",
    sources: "contracts",
    cache: "cache",
    tests: "test"
  },
};
