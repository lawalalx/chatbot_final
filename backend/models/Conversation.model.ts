import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: []
    }
  ]
}, { timestamps: true });


const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;