const { Pool } = require('pg')

const configdb = {
    database: 'protheus',
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Totvs@123',
    port: 5432,
};

const company = '99'

const paramsSchema = ['X6_FIL', 'X6_VAR', 'X6_TIPO', 'X6_DESCRIC', 'X6_CONTEUD', 'X6_PROPRI'];


module.exports = {
    getParams(request, response) {
        return query('SX6', paramsSchema, request, response);
    }
};

async function query(table, fieldsDefault, request, response) {

    try {

        const page = parseInt(request.query.page) || 1;
        const pageSize = Math.min(parseInt(request.query.pageSize) || 20, 200); // Default 20, máximo 200 registros por query
        const id = request.id;

        const fieldsNormalized = normalizedefaultFields(fieldsDefault);
        const defaultFieldsNames = fieldsNormalized.map(f => f.name)
        const fieldsSelect = selectFields(request.query.fields, fieldsNormalized);
        const filtersQuery = whereFields(request.query, defaultFieldsNames);
        const fieldsOrder = orderFields(request.query.order, defaultFieldsNames);
    
        const query = mountQuery(table, fieldsSelect, filtersQuery, fieldsOrder, page, pageSize);
        
        const pool = new Pool(configdb);
        
        
        const result = await pool.query(query);
        // console.log(result);
        const { rows } = result;
        const hasNext = rows.length > pageSize;
        const items = rows.slice(0, pageSize)
        
        response.json({ hasNext, items });

    } catch (error) {
        console.error(`Error on get: ${table}${company}0`, error);
        response.status(400).json({ message: `Error on get: ${table}${company}0`, stack: error.stack } );
    }

}

// Normaliza os campos vindos da requisição e filtra espaços em branco
function normalizeFields(fields) {
    return fields.split(',')
    .map(f=> f.trim().toUpperCase())
    .filter(f=> f) // Filtra vazios
}

// Normaliza os Objetos de campos a selecionar
function normalizedefaultFields(fields) {
    return fields.map(f => ( {
        name: f.name || f,
        type: f.type || 'C',
        id: f.id || false,
    }));
}

// Retorna os campos requisitados em ordem 
function selectFields(fields, defaultFields) {
    
    if (fields) {
        const selected = normalizeFields(fields)
            .filter(f => defaultFields.find(def => def.name === f));

        if (selected && selected.length) 
            return selected.map(f => defaultFields.find(def => def.name === f));
    }

    return defaultFields;
}

// Retorna os campos de ordenação devidamente normalizados e com a instrução decrescente quando necessário
function orderFields(fields, defNames) {
    
    if (fields) {
        const orderFields = normalizeFields(fields)
            .map(f=> f.slice(0,1) === '-' ? `${f.slice(1)} DESC` : f )
            .filter(f => defNames.includes( f.split(' ')[0]));

        if (orderFields && orderFields.length) 
            return orderFields;
    }

    return [];
}

function whereFields(fields, defNames) {
    
    if (fields) {
        
        //TODO: tratar command para os campos que não são texto
        const whereFields = Object.keys(fields)
        .map(name => ({ name: name.trim().toUpperCase(), command: 'LIKE', value: fields[name] }) )
        .filter(f => defNames.includes( f.name ));
        
        if (whereFields && whereFields.length) 
            return whereFields;
    }
    
    return [];
    
}


// Monta a query SQL
function mountQuery(table, select, where, order, page, pageSize) {
    
    const fields = select.map(f=> f.type === 'C' ? `TRIM(${f.name}) AS ${f.name}` : f.name ).join(', ');
    
    let values = [];
    let query = ''
    
    query+= ` SELECT ${fields}`
    query+= ` FROM ${table}${company}0 ${table}`
    query+= ` WHERE ${table}.D_E_L_E_T_ = ' '`;

    if ( where.length > 0) {
        // TODO: Tratar campos que não são texto
        query+= ` AND ${where.map(f => {
            values.push(f.value);
            return `${f.name} = $${values.length} `
            // return `${f.name} ${f.command} '%$${values.length}%' `
        })}`
    }

    query+= ` ORDER BY ${ order.length > 0 ? order.join(', ') : '1, 2'}`;
    
    query+= `
    LIMIT ${pageSize + 1}
    OFFSET ${(page -1) * pageSize}`
    
    
    console.info(query, values);
    //{text:'SELECT * FROM SX6990 WHERE X6_VAR = $1', values: ['MV_ESPECIE']}
    return { text: query, values };
}
