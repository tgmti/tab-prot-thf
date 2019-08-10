const express = require('express');

const controllers = require('../controllers');

const routes = express.Router();

routes.get('/', (request, response) => response.json({message: 'API Tabelas Protheus'}));
routes.get('/params', controllers.getParams);
routes.get('/params/:id', (request, response) => {
    console.log(request);
    return response.json({ok:'ok'})
});
routes.get('/tables', (request, response) => response.json({message: 'Returns Tables'}));
routes.get('/fields', (request, response) => response.json({message: 'Returns Fields'}));
routes.get('/indexes', (request, response) => response.json({message: 'Returns indexes'}));

module.exports = routes;