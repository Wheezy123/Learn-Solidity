const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  // HDWalletPovider takes 2 args, wallet seed phrase and url of link to network you want to connect to
  // account mnemonic 12 word seed phrase below as first argument
  'more vital swamp donkey fluid easy unveil fall gain maple shiver syrup',
  'https://rinkeby.infura.io/Q5qLsRVaguTL2X6EEVld'
);

const web3 = new Web3(provider);

// function below is only available so we can use the async await syntax
const deploy = async () => {
  // first, get list of unlocked accounts
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['This is going to be deployed!']})
    .send({gas: '1000000', from: accounts[0]});

  // below print out address where conttract was deployed, or else we have no idea where it was deployed!
  console.log('Contract deployed to', result.options.address);
};

// invoke deployent function
deploy();
