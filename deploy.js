const solc = require('solc')
const fs = require('fs')
const Web3 = require('web3');
var Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
Contract.setProvider('HTTP://127.0.0.1:7545');

const fileContent = fs.readFileSync('demo.sol', 'utf8').toString();

var input = {
    language: "Solidity",
    sources: {
      "demo.sol": {
        content: fileContent,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
};
  
var output = JSON.parse(solc.compile(JSON.stringify(input)));

ABI = output.contracts["demo.sol"]["Election"].abi;
bytecode = output.contracts["demo.sol"]["Election"].evm.bytecode.object;

const contract = new Contract(ABI);

web3.eth.getAccounts((err, accounts) => {
    defaultAccount = accounts[0];
    console.log("Default Account:", defaultAccount); 
    contract
        .deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 3000000 })
        .on("receipt", (receipt) => {
            console.log("Contract Address:", receipt.contractAddress);
        })
        .then((demoContract) => {
            demoContract.methods.candidateName().call({from:web3.eth.accounts[0]}).then(function(result) {
                console.log("Initial Value:", result);
        })
    });
    
});
  