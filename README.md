# js-blockchain

You can start multiple servers with

`npm run dev <port>`

POST /transacations a transaction on a server

`localhost<PORT>/transactions`

GET /mine to push transactions to blockchain

Server must use /register path to know of each others existence. They must also use /resolve to catch up to the current blockchain on any server they are aware of/.
