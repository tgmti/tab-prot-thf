const Schemas = require('./dbschema');
const Metadata = require('./metadata');

module.exports = {

    getParams: Schemas.params,
    getTables: Schemas.tables,
    getFields: Schemas.fields,
    getIndexes: Schemas.indexes,

    getTablesMetadata: Metadata.table,
    getFieldsMetadata: Metadata.fields,
    getIndexesMetadata: Metadata.indexes,
    getParamsMetadata: Metadata.params,

};
