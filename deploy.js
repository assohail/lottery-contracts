import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';

// const {abi, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'corn inmate sorry please chef smooth hour argue erupt meat differ frequent',
  'https://sepolia.infura.io/v3/c24f61d37f764ef0841ed632141835d0'
);
import lottery from './build/contracts/Lottery.json' assert { type: "json"}
console.log('lottery'+ lottery);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    lottery.abi
  )
    .deploy({ data: lottery.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();