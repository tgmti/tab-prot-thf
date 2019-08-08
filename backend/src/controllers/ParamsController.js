const db = require('../db');

module.exports = {
    async getParams(request, response) {
        try {
            const ret = await db.query('SELECT * FROM SX6990 LIMIT 10');
            console.log(ret);
            response.send(ret);
            
        } catch (error) {
            console.error('Error on getParams: ', error);
            response.status(400).send(error);
        }
    }
}