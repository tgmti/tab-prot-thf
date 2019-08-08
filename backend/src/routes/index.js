const express = require('express');

const ParamsController = require('../controllers/ParamsController');

const routes = express.Router();

routes.get('/', (request, response) => response.json({message: 'API Tabelas Protheus'}));
routes.get('/params', ParamsController.getParams);
routes.get('/tables', (request, response) => response.json({message: 'Returns Tables'}));
routes.get('/fields', (request, response) => response.json({message: 'Returns Fields'}));
routes.get('/indexes', (request, response) => response.json({message: 'Returns indexes'}));

module.exports = routes;