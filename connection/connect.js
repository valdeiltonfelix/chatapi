const { Client } = require('pg');
require('dotenv').config();

(async () => {
 
   const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password:process.env.PG_PASSWORD,
        database:process.env.PG_DATABASE,
        ssl:false,

   });
   await client.connect();
   const res = await client.query('select $1::text as connect',['Conectado ao banco de dados'])
   console.log(res.rows[0].connect);
   await client.end();
})();