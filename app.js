const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const Block = require('./block')
const BlockChain = require('./blockchain')
const Transaction = require('./transaction')

let transactions = []
const genesisBlock = new Block()
const blockchain = new BlockChain(genesisBlock)

app.use(bodyparser.json)

app.get('/', (req, res) => {
  res.send('server running!')
})

app.get('/mine', (req, res) => {
  const block = blockchain.getNextBlock(transactions)
  blockchain.addBlock(block)
  res.json(block)
})

app.post('/transactions', (req, res) => {
  console.log('creating transaction')

  const { to, from, amount } = req.body

  const transaction = new Transaction(from, to, amount)

  transactions.push(transaction)

  res.json(transactions)
})

app.get('/blockchain', (req, res) => {
  res.json(blockchain)
})

app.listen(3000, () => {
  console.log('server started on port 3000')
})
