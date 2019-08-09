const db = require('../db');

module.exports = {
    getParams(request, response, defaultFields) {

        /* 
        params: { id: 'sx4' },
        query: { fields: 'testt,t2,t3', search: 'abc' },
        body: {},  
        */
        const page = parseInt(request.query.page) || 1;
        const pageSize = Math.min(parseInt(request.pageSize) || 10,200); // Default 20, máximo 200 registros por query
        const id = request.id;

        // ['X6_FIL', 'X6_VAR', 'X6_TIPO', 'X6_DESCRIC', 'X6_CONTEUD', 'X6_PROPRI'], request.fields );
        
        const fieldsNormalized = defaultFields.map(f => ( {
            name: f.name || f,
            type: f.type || 'C',
            id: f.id || false,
        }));
        
        const filteredFields = filterFields(request.fields, fieldsNormalized);

        const query = `
            SELECT ${fields.map(field => `TRIM(${field}) AS ${field}`).join(',')}
            FROM SX6990
            LIMIT 50
        `;

        try {
            const hasNext = true;
            const { rows: items } = db.query(query);
            
            response.json({ hasNext,items });
            
        } catch (error) {
            console.error('Error on getParams: ', error);
            response.status(400).send(error);
        }
    },

    filterFields(fieldsRequired, defaultFields) {
        if (!fieldsRequired) return defaultFields;

        // Normaliza os campos requisitados, e filtra os campos em branco
        const filteredFields = fieldsRequired.split(',')
            .map(f=> f.trim().toUpperCase())
            .filter(f=> f) // Filtra vazios, se ouver
            .filter(f => defaultFields.find(def => def.name === f))
            .map(f => defaultFields.find(def => def.name === f));
            
            return filteredFields.length ? filteredFields : defaultFields;
    },
    
    orderFields(fieldsRequired, defaultFields) {
        if (!fieldsRequired) return null;

        // Normaliza os campos requisitados, e filtra os campos em branco
        const fOrd = fieldsRequired.split(',')
            .map(f=> f.trim().toUpperCase())
            .filter(f=> f && defaultFields.find(def => def.name === f); // Filtra vazios, se ouver
            .map(f => f.slice(0,1) === '-'? f.slice(1) + ' DESC' : f );
            .filter(f => defaultFields.find(def => f.includes(def.name));
        
        return filteredFields.length ? filteredFields : defaultFields;
    },

    checkfields: (fieldsDefault, fields) => {
        const fieldsDefaultNames = fieldsDefault.map(f => f.name || f);
        const filteredFields = fields ? 
            fields.split(',')
                .map(f=> f.trim().toUpperCase())
                .filter(f => f && fieldsDefaultNames.includes(f))
        : fieldsDefaultNames;

        (filteredFields || fieldsDefaultNames).map(f => fieldsDefault[indexOf[f]] )

        return (fret && fret.length ? fret : fdef).join(',');
    }
}

