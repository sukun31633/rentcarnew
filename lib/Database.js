const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "meeting",
    waitForConnections: true,
    connectionLimit: 10,   // จำนวนการเชื่อมต่อสูงสุดที่ Pool สามารถสร้างได้
    queueLimit: 0          // จำนวนการเชื่อมต่อที่สามารถอยู่ในคิวได้ (0 หมายถึงไม่จำกัด)
});

module.exports = pool;
