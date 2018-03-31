const assert = require('assert');
const ganache = require('ganache-cli');
// below is constructor, used to create instances of the Web3 library. constructor vars are Capitalized
const Web3 = require('web3');
// instance var of web3 below, lower case == instance var
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


// class Car {
//   park(){
//     return 'stopped';
//   }

//   drive(){
//     return 'vroom';
//   }
// }


// let car;

// beforeEach(() => {
//    car = new Car();
// });

// describe("Car", () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });

//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  // Use one of those accounts to deploy the contract

  // web3.eth.getAccounts().then(fetchedAccounts => {
  //   console.log(fetchedAccounts);
  // })
  accounts = await web3.eth.getAccounts();

  // deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    .send({ from: accounts[0], gas:'1000000' });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});