import exprss from "express"
import mainRouter from './routes/index.js'

const app = exprss();

app.use(exprss.json());

// all routes
app.use('/api', mainRouter);

export default app;

