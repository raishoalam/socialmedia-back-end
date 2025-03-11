const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",       // Database host
  user: "root",            // MySQL username
  password: "root",            // MySQL password
  database: "socialmedia"  // Database name (as created above)
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

module.exports = db;
