import { Request, Response } from "express";
import Conversation from "../models/Conversation.model";
import Message from "../models/Message.model";
import { getReceiverSocketId, io } from '../socket/socket'; 


export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    console.log("req.body", req.body);
    let { id: receiverId } = req.params;
    const  senderId  = req.user._id;

    console.log("receiverId", receiverId, "senderId", senderId, "message", message);

    // Check if senderId and receiverId exist
    if (!senderId || !receiverId) {
      res.status(400).json({ message: "Sender or Receiver ID is missing." });
      return;
    }
    
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (conversation) {
      conversation.messages.push(newMessage._id);
      // Save in parallel
    }
    console.log("Conversation before save:", conversation);
    await Promise.all([newMessage.save(), conversation.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ newMessage });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    if (!senderId || !userToChatId) {
      res.status(400).json({ message: "Sender or Receiver ID is missing." });
      return;
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    const messages = conversation.messages;
    res.status(200).json(messages);

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}