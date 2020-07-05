const express = require('express');
const path = require('path');

const controllers = require('../controllers');
const config = require('../config');

const routes = express.Router();

routes.get('/api', (req,res) => res.json({message: 'API Tabelas Protheus'}));
routes.get('/api/config', config.configPage);
routes.post('/api/config', config.setConfig);

routes.get('/api/tables/metadata', controllers.getTablesMetadata);
routes.get('/api/fields/metadata', controllers.getFieldsMetadata);
routes.get('/api/indexes/metadata', controllers.getIndexesMetadata);
routes.get('/api/params/metadata', controllers.getParamsMetadata);

routes.get('/api/tables', controllers.getTables);
routes.get('/api/fields', controllers.getFields);
routes.get('/api/indexes',controllers.getIndexes);
routes.get('/api/params', controllers.getParams);

routes.get('/api/params/:id', (req,res) => res.json({message: 'Returns a Param - in progress...'}));

// SPA Static Files
routes.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '..', 'dist', 'tab-prot-thf', 'index.html'));
  });

module.exports = routes;
