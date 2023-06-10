const mysql = require ('mysql');

const connection = mysql.createConnection({
 
host : 'localhost',
user : 'root',
password : '',
database : 'company'
});

connection.connect( (err)=>{
    if(err) throw err;
    console.log("Database is connected")
})

module.exports = connection
