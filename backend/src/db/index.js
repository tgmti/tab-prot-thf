const { Pool } = require('pg')

const configdb = {
    database: 'protheus',
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Totvs@123',
    port: 5432,
};

const pool = new Pool(configdb)
module.exports = {
  query: async (sql, params) => await pool.query(sql, params)
}