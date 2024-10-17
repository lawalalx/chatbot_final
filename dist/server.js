"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./socket/socket");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/dist", "index.html"));
});
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/messages", message_routes_1.default);
socket_1.app.use("/api/users", user_routes_1.default);
// Serve static files from the frontend dist directory
socket_1.app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
socket_1.app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/dist", "index.html"));
});
socket_1.server.listen(port, () => {
    (0, connectToMongoDB_1.default)();
    console.log(`Server Running on port ${port}`);
});
