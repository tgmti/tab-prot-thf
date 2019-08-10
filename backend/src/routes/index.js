const express = require('express');

const controllers = require('../controllers');

const routes = express.Router();

routes.get('/', (req,res) => response.json({message: 'API Tabelas Protheus'}));
routes.get('/params', controllers.getParams);
routes.get('/params/:id', (req,res) => response.json({message: 'Returns a Param - in progress...'}));
routes.get('/tables', controllers.getTables);
routes.get('/fields', controllers.getFields);
routes.get('/indexes',controllers.getIndexes);

module.exports = routes;