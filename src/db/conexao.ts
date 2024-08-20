import mysql, { Connection } from 'mysql';

const conexao: Connection = mysql.createConnection({
    host: 'moab-server.ddns.me',
    port: 3306,
    user: 'moab',
    password: 'Guilherme@1998',
    database: 'XMLcasadeCarnes',
});

export default conexao;