
import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    user:sql8759897,
    host:sql8.freesqldatabase.com,
    password:DRe69iuwJk,
    database:sql8759897,
    Port: 3306,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0, 
    
});

export default pool;

