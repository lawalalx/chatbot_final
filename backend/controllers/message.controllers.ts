import { Request, Response } from "express";
import Conversation from "../models/Conversation.model";
import Message from "../models/Message.model";


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

      console.log("Conversation before save:", conversation);
      await Promise.all([newMessage.save(), conversation.save()]);
    }

    res.status(201).json({ message: `Message Sent: ${newMessage}` });

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