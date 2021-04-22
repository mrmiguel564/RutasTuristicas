const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'desa2',
    password: 'Desatest01',
    database: 'turismo_sa'
});

conn.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('La base de dato esta conectada')
    }
});
 

module.exports = conn;