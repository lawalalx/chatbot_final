import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import { app, server } from "./socket/socket";
import path from 'path';

import express, { Request, Response } from "express";
import connectToMongoDB from './db/connectToMongoDB';

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

server.listen(port, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${port}`);
});
