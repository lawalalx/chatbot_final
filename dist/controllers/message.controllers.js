"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = void 0;
const Conversation_model_1 = __importDefault(require("../models/Conversation.model"));
const Message_model_1 = __importDefault(require("../models/Message.model"));
const socket_1 = require("../socket/socket");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        console.log("req.body", req.body);
        let { id: receiverId } = req.params;
        const senderId = req.user._id;
        console.log("receiverId", receiverId, "senderId", senderId, "message", message);
        // Check if senderId and receiverId exist
        if (!senderId || !receiverId) {
            res.status(400).json({ message: "Sender or Receiver ID is missing." });
            return;
        }
        let conversation = yield Conversation_model_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield Conversation_model_1.default.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message_model_1.default({
            senderId,
            receiverId,
            message,
        });
        if (conversation) {
            conversation.messages.push(newMessage._id);
            // Save in parallel
        }
        console.log("Conversation before save:", conversation);
        yield Promise.all([newMessage.save(), conversation.save()]);
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({ newMessage });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        if (!senderId || !userToChatId) {
            res.status(400).json({ message: "Sender or Receiver ID is missing." });
            return;
        }
        const conversation = yield Conversation_model_1.default.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        if (!conversation) {
            res.status(200).json([]);
            return;
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getMessages = getMessages;
