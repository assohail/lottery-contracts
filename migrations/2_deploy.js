var lottery = artifacts.require("../contracts/lottery");
module.exports = function(deployer) {
  deployer.deploy(lottery);
  console.log('deployed')
//   .then(function(){ //1000000
//     // token price is 0.001 ether
//     var tokenPrice = 1000000000000000;
//     return deployer.deploy(AMZTokenSale, AMZToken.address, tokenPrice);
//   })
  
};