import { useState } from "react";
import userConversation from "../src/zustand/userConversation";
import toast from "react-hot-toast";
import { UserConversation } from "../src/types";

const useSendMessages = () => {

  const [loading, setLoading] = useState(false);

  const {messages, setMessages, selectedConversation} = userConversation() as UserConversation;

  const sendMessage = async(message: any) => {
    // console.log("Selected Conversation",selectedConversation);
    // console.log("Message", message);

    setLoading(true);
    try {
        const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify({message}),
        });   
        const data = await response.json();
        console.log("Result after sending message", data["newMessage"]);

        if (data.error) throw new Error(data.error);
        
        setMessages([...messages, data["newMessage"]]);
        console.log("Messages after updating", messages);
        setLoading(false);
        toast.success("Message sent successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return { sendMessage, loading};
};

export default useSendMessages;