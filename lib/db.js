import mysql from 'mysql2/promise';


let pool;

export const createConnection = async () => {
    if(!pool){
        pool = await mysql.createConnection({
            user: process.env.DATABASE_USER,
            host:process.env.DATABASE_HOST,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10, 
            queueLimit: 0,
        })
    }
    return pool;
}
