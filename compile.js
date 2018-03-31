const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// pass along source, and number of contracts that need to be compiled
// since only returning 1 contract, we can specifify we want the Inbox node returned only
module.exports = solc.compile(source, 1).contracts[':Inbox'];