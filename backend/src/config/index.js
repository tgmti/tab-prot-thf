const fs = require('fs');
const configFile = './config/dbconfig.json';
const dbConfig = require('./dbconfig.json');

module.exports = {
    configPage(req, res) {
        res.send(configPage(dbConfig));
    },
    setConfig(req, res) {
        res.send(writeDbConfig(req.body));
    },
    getDbConfig() {
        return dbConfig;
    }

}

function writeDbConfig(newConfig) {
    fs.writeFile(configFile, JSON.stringify(newConfig), 'utf-8', (err)=> {
        if (err) {
            console.error('Error getConfig', err);
            return `Error config Database: ${err}`;
        }
        return `Database configuration success!`;
    });
}


function configPage(config) {
    const { sgdb, database, host, user, port, company } = config;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Tabelas Protheus API - Configuração</title>
    </head>
    <body>
        <h3> Dados de conexão com o servidor SQL</h3>

        <form method="post">

            <div>
                <span>SGDB:</span>
                <br/>
                <label>MS Sql Server: <input type="radio" name="sgdb" value="mssql" ${sgdb === 'mssql'? 'checked': ''} /></label>
                <br/>
                <label>PostgreSQL:    <input type="radio" name="sgdb" value="pg" ${sgdb === 'pg'? 'checked': ''} /></label>
            </div>
            <br/>
            <div><label>Database  <input type="text" name="database" value="${database}" /> </label></div>
            <div><label>Host:     <input type="text" name="host" value="${host}" /> </label></div>
            <div><label>User:     <input type="text" name="user" value="${user}" /> </label></div>
            <div><label>Password: <input type="password" name="password" value="" /> </label></div>
            <div><label>Port:     <input type="text" name="port" value="${port}" /> </label></div>
            <div><label>Company:  <input type="text" name="company" value="${company}" /> </label></div>

            <input type="submit">
        </form>
    </body>
    </html>
    `
}