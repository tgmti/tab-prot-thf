const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const APIPORT = 3333
const server = express();

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(routes);

server.listen(APIPORT, ()=> console.info(`API Listening on ${APIPORT} port...`));
