const Block = require('./block')
const BlockChain = require('./blockchain')
const Transaction = require('./transaction')

const genesisBlock = new Block()
const blockchain = new BlockChain(genesisBlock)

const transaction = new Transaction('Mary', 'John', 100)
const block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

const transaction2 = new Transaction('Tony', 'Beth', 1000)
const block2 = blockchain.getNextBlock([transaction2, transaction])
blockchain.addBlock(block2)

console.log(blockchain)
