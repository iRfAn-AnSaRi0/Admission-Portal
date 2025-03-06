import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ limit: "24kb", extended: true }));

import { router } from './routes/UserRoute.js';

app.use("/user", router)

export { app };
