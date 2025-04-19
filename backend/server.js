import exprss from "express"
import dotenv from "dotenv"
import router from "./routes/index.js";

import "./config/db.postgres.js"

dotenv.config();


const app = exprss();
const PORT = process.env.PORT;

app.use(exprss.json());
app.use('/', router);



app.listen(PORT, ()=>{
    console.log(`Srver Startd at ${PORT}`);
    
})

