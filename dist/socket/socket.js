"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["https://chatbot-final-c7fd.onrender.com"],
        methods: ["GET", "POST"],
    },
});
exports.io = io;
// Initialize the user socket map
const userSocketMap = {}; // { userId: socketId }
// Function to get the receiver's socket ID
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
// Handle socket connection events
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Get userId from the socket's handshake query
    const userId = socket.handshake.query.userId;
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
