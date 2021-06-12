// == importing mysql library == 
const mysql=require('mysql2')

// == Database Configuration ==

var mysqlConnection =mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'55555',
        database:'mahi'
    }
);

module.exports.mysqlConnection=mysqlConnection


mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Databse Connection Succeed..');
    else
    console.log('Db connection failed \n'+JSON.stringify(err));
});

// mysqlConnection.query('select * from candidate',(err,rows,fields)=>{
//     if(!err)
//    console.log(rows)
//     else
//     console.log(err)
// })


