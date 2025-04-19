import pkg from "pg"
import dotnv from "dotenv"

dotnv.config();
const {Pool} = pkg;

// const pool = new Pool({
//     user : process.env.PG_USER,
//     host : process.env.PG_HOST,
//     database : process.env.PGH_DATABASE,
//     password : process.env.PG_PASWORD,
//     port : process.env.PG_PORT,
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
.then(() => console.log("Connected To PostgreSQL"))
.catch((error) => console.log("PostgreSQL connection Error", error));


export default pool;

