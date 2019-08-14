const express = require('express');

const controllers = require('../controllers');
const config = require('../config');

const routes = express.Router();

routes.get('/', (req,res) => res.json({message: 'API Tabelas Protheus'}));
routes.get('/config', config.configPage);
routes.post('/config', config.setConfig);
routes.get('/params', controllers.getParams);
routes.get('/params/:id', (req,res) => res.json({message: 'Returns a Param - in progress...'}));
routes.get('/tables', controllers.getTables);
routes.get('/fields', controllers.getFields);
routes.get('/indexes',controllers.getIndexes);

module.exports = routes;
