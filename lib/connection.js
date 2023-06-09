const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection(
  {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
},
console.log(`Connected to emp_db!`)
);

module.exports = connection;