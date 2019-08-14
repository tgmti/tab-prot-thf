const fs = require('fs');
const configFile = './config/dbconfig.json';
const dbConfig = require('./dbconfig.json');

module.exports = {
    configPage(req, res) {
        console.log(dbConfig);
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
    console.log(newConfig);
    fs.writeFile(configFile, JSON.stringify(newConfig), 'utf-8', (err)=> {
        if (err) {
            console.log('Error getConfig', err);
            return `Error config Database: ${err}`;
        }
        return `Database configuration success!`;
    });
}


function configPage(config) {
    const { database, host, user, port } = config;
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
        <h3> Dados de conexão com o servidor PostgreSQL</h3>
        
        <form method="post">
            <div><span>Database  </span><input type="text" name="database" value="${database}" /></div>
            <div><span>Host:     </span><input type="text" name="host" value="${host}" /></div>
            <div><span>User:     </span><input type="text" name="user" value="${user}" /></div>
            <div><span>Password: </span><input type="password" name="password" value="" /></div>
            <div><span>Port:     </span><input type="text" name="port" value="${port}" /></div>
        
            <input type="submit">
        </form>        
    </body>
    </html>
    `
}