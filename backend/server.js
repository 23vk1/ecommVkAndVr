import dotenv from "dotenv"
import app from "./app.js";

import "./db/postgres.js"
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);  
})

