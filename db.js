const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  user: "root",
  password: "Shanuak12@",
  host: "localhost",
  port: 3306,
  database: "turtoise"
});

module.exports = pool;
