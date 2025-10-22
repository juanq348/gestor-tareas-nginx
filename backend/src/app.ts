import express from "express"
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()

import tareasRoutes from './routes/tareas.routes';

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())

app.use('/api/tasks', tareasRoutes);

export default app