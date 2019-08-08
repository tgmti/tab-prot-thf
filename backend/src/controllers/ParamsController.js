const db = require('../db');

module.exports = {
    async getParams(request, response) {

        const fields = ['X6_FIL', 'X6_VAR', 'X6_TIPO', 'X6_DESCRIC', 'X6_CONTEUD', 'X6_PROPRI'];
        const query = `
            SELECT ${fields.map(field => `TRIM(${field}) AS ${field}`).join(',')}
            FROM SX6990
            LIMIT 50
        `;

        try {
            const hasNext = true;
            const { rows: items } = await db.query(query);
            
            response.json({ hasNext,items });
            
        } catch (error) {
            console.error('Error on getParams: ', error);
            response.status(400).send(error);
        }
    }
}