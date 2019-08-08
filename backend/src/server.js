const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
