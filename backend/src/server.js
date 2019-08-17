const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const APIPORT = 3333
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(routes);

server.listen(APIPORT, ()=> console.info(`API Listening on ${APIPORT} port...`));
