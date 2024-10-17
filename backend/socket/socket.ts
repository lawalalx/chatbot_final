import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

// Define the type for the user socket map
type UserSocketMap = Record<string, string>;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chatbot-final-c7fd.onrender.com"],
        methods: ["GET", "POST"],
    },
});

// Initialize the user socket map
const userSocketMap: UserSocketMap = {}; // { userId: socketId }

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
};

// Handle socket connection events
io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    // Get userId from the socket's handshake query
    const userId: string = socket.handshake.query.userId as string;

    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for disconnect events
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the app, io, and server
export { app, io, server };
