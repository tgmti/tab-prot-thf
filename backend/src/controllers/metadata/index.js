const TablesMetadata = require("./TablesMetadata");
const FieldsMetadata = require("./FieldsMetadata");
const IndexesMetadata = require("./IndexesMetadata");
const ParamsMetadata = require("./ParamsMetadata");

module.exports = {
    table(req, res) { return getMetadata(TablesMetadata, req, res); },
    fields(req, res) { return getMetadata(FieldsMetadata, req, res); },
    indexes(req, res) { return getMetadata(IndexesMetadata, req, res); },
    params(req, res) { return getMetadata(ParamsMetadata, req, res); },
}

async function getMetadata(metadata, req, res) { res.json(metadata); }