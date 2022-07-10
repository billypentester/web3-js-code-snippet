const Web3 = require('web3');
var Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
Contract.setProvider('HTTP://127.0.0.1:7545');

const contract = new Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "candidateName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "candidater",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
],"0x1711EF7c41e927d945527E0eb0b2e970a3C7F390")

// get Accounts 

web3.eth.getAccounts((err, accounts) => {
	console.log("Accounts:", accounts);
})

// get balance

web3.eth.getBalance(web3.eth.accounts[0], (err, balance) => {
    console.log(web3.fromWei(balance, 'ether'));
})

// transfer ethers

web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: web3.eth.accounts[1], value: web3.toWei('1', 'ether') }, (err, transactionHash) => {
    console.log(transactionHash);
})

// contract call for function

contract.methods.setCandidate("bilal").call({from:web3.eth.accounts[0]}).then(function(result) {
    console.log(result);
})

// contract call for variable

contract.methods.candidateName().call({from:web3.eth.accounts[0]}).then(function(result) {
    console.log(result);
})

