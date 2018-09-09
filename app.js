const express = require('express')
const app = express()
const port = process.argv[2] || 3000
const fetch = require('node-fetch')
const bodyparser = require('body-parser')
const Block = require('./block')
const BlockChain = require('./blockchain')
const BlockchainNode = require('./BlockchainNode')
const Transaction = require('./transaction')

let transactions = []
let nodes = []
const genesisBlock = new Block()
let blockchain = new BlockChain(genesisBlock)

app.use(bodyparser.json())

app.post('/nodes/register', (req, res) => {
  const nodesList = req.body.urls
  nodes = nodesList.map(node => new BlockchainNode(node.url))

  res.json(nodes)
})

app.get('/nodes', (req, res) => {
  res.json(nodes)
})

app.get('/resolve', (req, res) => {
  nodes.forEach(node => {
    fetch(node.url + '/blockchain')
      .then(res => res.json())
      .then(otherBlockchain => {
        if (blockchain.blocks.length < otherBlockchain.blocks.length) {
          blockchain = otherBlockchain
        }

        res.json(blockchain)
      })
  })
})

app.get('/', (req, res) => {
  res.send('server running!')
})

app.get('/mine', (req, res) => {
  const block = blockchain.getNextBlock(transactions)
  blockchain.addBlock(block)
  transactions = []
  res.json(block)
})

app.post('/transactions', (req, res) => {
  const { to, from, amount } = req.body

  const transaction = new Transaction(from, to, amount)

  transactions.push(transaction)

  res.json(transactions)
})

app.get('/blockchain', (req, res) => {
  res.json(blockchain)
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
