const HDWalletProvider = require('truffle-hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/979455b137d44f8aa542c510f56d8d44'),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/v3/979455b137d44f8aa542c510f56d8d44'),
      network_id: 1,
      gas: 9000000,
      confirmations: 2,
      timeoutBlocks: 200
    }
  }
};