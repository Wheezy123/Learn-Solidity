const assert = require('assert');
const ganache = require('ganache-cli');
// below is constructor, used to create instances of the Web3 library. constructor vars are Capitalized
const Web3 = require('web3');
// instance var of web3 below, lower case == instance var
const provider = ganache.provider();
const web3 = new Web3(provider);
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
  // web3.eth.getAccounts().then(fetchedAccounts => {
  //   console.log(fetchedAccounts);
  // })
  
  // same as above using await async syntax
  // *** all web3 functions will return a promise that needs to be resolved!
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
                              // arguments array is 1 to 1 feeding of args listed into contract Constructor function
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    .send({ from: accounts[0], gas:'1000000' }
  );

    inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it(" has a default message", async () => {
    const message = await inbox.methods.message().call();
  });
});









