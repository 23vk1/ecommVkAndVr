import exprss from "express"
import userRoutes from "./routes/user.routes.js";

const app = exprss();

app.use(exprss.json());

console.log("hit");

app.use('/api/users', userRoutes);

console.log("hit again");

export default app;

