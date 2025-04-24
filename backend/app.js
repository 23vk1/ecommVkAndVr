import exprss from "express"
import userRoutes from "./routes/user.routes.js";
import authRoutes from './routes/auth.routes.js';

const app = exprss();

app.use(exprss.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;

