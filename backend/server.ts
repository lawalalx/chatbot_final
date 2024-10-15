import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import cookieParser from 'cookie-parser';

import express, { Express, Request, Response } from "express";
import connectToMongoDB from './db/connectToMongoDB';

import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});