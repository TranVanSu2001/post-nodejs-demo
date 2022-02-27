const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "661002",
  database: "nodejs",
});

module.exports = db;
