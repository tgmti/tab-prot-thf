const { Pool } = require('pg')

const configdb = {
    database: 'protheus',
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Totvs@123',
    port: 5432,
};

const company = '99'

const ParamsSchema = require('./ParamsSchema');
const TablesSchema = require('./TablesSchema');
const IndexesSchema= require('./IndexesSchema');
const FieldsSchema = require('./FieldsSchema');

module.exports = {
    getParams(request, response) {
        return query('SX6', ParamsSchema, request, response);
    },
    getTables(request, response) {
        return query('SX2', TablesSchema, request, response);
    },
    getFields(request, response) {
        return query('SX3', FieldsSchema, request, response);
    },
    getIndexes(request, response) {
        return query('SIX', IndexesSchema, request, response);
    }
};

async function query(table, fieldsDefault, request, response) {

    try {

        const page = parseInt(request.query.page) || 1;
        const pageSize = Math.min(parseInt(request.query.pageSize) || 20, 200); // Default 20, máximo 200 registros por query
        const id = request.id;

        const fieldsNormalized = normalizedefaultFields(fieldsDefault);
        const fieldsSelect = selectFields(request.query.fields, fieldsNormalized);
        const filter = filterFields(request.query.filter, fieldsNormalized);
        const fieldsWhere = [...filter,...whereFields(request.query, fieldsNormalized)];
        const fieldsOrder = orderFields(request.query.order, fieldsNormalized);

        const query = mountQuery(table, fieldsSelect, fieldsWhere, fieldsOrder, page, pageSize);
        
        const pool = new Pool(configdb);
        
        
        const result = await pool.query(query);
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
        canFilter: f.canFilter || false,
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
function orderFields(fields, defaultFields) {
    
    if (fields) {
        const defNames = defaultFields.map(f => f.name);
        const orderFields = normalizeFields(fields)
            .map(f=> f.slice(0,1) === '-' ? `${f.slice(1)} DESC` : f )
            .filter(f => defNames.includes( f.split(' ')[0]));

        if (orderFields && orderFields.length) 
            return orderFields;
    }

    return [];
}

// Monta o comando de filtro
function filterFields(filter, defaultFields) {

    if (filter) {
        return [{ 
            name: defaultFields.filter(f => f.canFilter )
            .map( f=> `UPPER(TRIM(${f.name}))` )
            .join('||'),
            command: 'LIKE',
            value: `%${filter.trim().toUpperCase()}%`
        }];
    }
    
    return [];
}

// Organiza os campos que serão passados para a Cláusula Where
function whereFields(fields, defaultFields) {
    
    const defNames = defaultFields.map(f => f.name);

    if (fields) {
        
        //TODO: tratar command para os campos que não são texto
        const whereFields = Object.keys(fields)
            .filter(name => defNames.includes( name.trim().toUpperCase() ))
            .map(f => {
                console.log(f)
                const nameUpper = f.trim().toUpperCase();
                const {type} = defaultFields.find(def => def.name === nameUpper);
                const name = type === 'C' ? `UPPER(TRIM(${nameUpper}))` : nameUpper;
                const command = type === 'C' ? 'LIKE' : '=';
                const value = type === 'C' ? `%${fields[f].trim().toUpperCase()}%` : fields[f];

                return { name, command, value };
            });
        
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
            return `${f.name} ${f.command} $${values.length} `
        }).join(' AND ') } `;

    }

    query+= ` ORDER BY ${ order.length > 0 ? order.join(', ') : '1, 2'}`;
    
    query+= `
    LIMIT ${pageSize + 1}
    OFFSET ${(page -1) * pageSize}`
    
    
    console.info(query, values);
    //{text:'SELECT * FROM SX6990 WHERE X6_VAR = $1', values: ['MV_ESPECIE']}
    return { text: query, values };
}
