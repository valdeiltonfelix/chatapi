const Client = require('pg').Pool;
require('dotenv').config();

function client(){
const pool = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})
return pool;
}

module.exports={client}