const { Client, Pool } = require('pg');
const client = new Client({
    user: 'albertkim',
    password: 'password',
    database: 'sdc',
    host:'localhost', 
    port: 5432
});

// client.connect();

// client.query('SELECT $1::text as message', ['Hello World! POSTGRES successfully connected'], (err, res) => {
//     if (err) {
//         throw err.stack;
//     } else {
//         console.log(res.rows[0].message);
//         client.end();
//     }
// });

const pool = new Pool({
    user: 'albertkim',
    password: 'password',
    database: 'sdc',
    host:'localhost', 
    port: 5432
});


// pool.connect();

// pool.query('SELECT $1::text as message', ['Hello World! POSTGRES successfully connected'], (err, res) => {
//     if (err) {
//         throw err.stack;
//     } else {
//         console.log(res.rows[0].message);
//         pool.end();
//     }
// });

module.exports = {
    pool,
    client
}