const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => response.json({message: 'API Tabelas Protheus'}));
routes.get('/params', (request, response) => response.json({message: 'Returns Params'}));
routes.get('/tables', (request, response) => response.json({message: 'Returns Tables'}));
routes.get('/fields', (request, response) => response.json({message: 'Returns Fields'}));
routes.get('/indexes', (request, response) => response.json({message: 'Returns indexes'}));

module.exports = routes;