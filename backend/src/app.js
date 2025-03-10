import express from 'express';
import cookieparser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ limit: "24kb", extended: true }));
app.use(cookieparser());

import { userrouter } from './routes/UserRoute.js';
import { applicationrouter } from './routes/ApplicationRoute.js';
import { adminrouter } from './routes/AdminRoute.js';

app.use("/user", userrouter)
app.use(applicationrouter)
app.use(adminrouter)

export { app };
