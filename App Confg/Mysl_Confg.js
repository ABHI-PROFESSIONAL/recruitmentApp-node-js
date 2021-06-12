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

// mysqlConnection.connect((err)=>{
//     if(!err)
//     console.log('Databse Connection Succeed..');
//     else
//     console.log('Db connection failed \n'+JSON.stringify(err));
// });

var remotemysqlConnection =mysql.createConnection(
    {
        host:'remotemysql.com',
        user:'ozNnFIQzfs',
        password:'2oxRHwO7Im',
        database:'ozNnFIQzfs'
    }
);

remotemysqlConnection.connect((err)=>{
    if(!err)
    console.log('Remote Databse Connection Succeed..');
    else
    console.log('Db connection failed \n'+JSON.stringify(err));
});

// remotemysqlConnection.query('select * from candidate',(err,rows,fields)=>{
//     if(!err)
//    console.log(rows)
//      else
//      console.log(err)
//  })

module.exports.mysqlConnection=mysqlConnection
module.exports.remotemysqlConnection=remotemysqlConnection
