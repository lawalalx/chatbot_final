import React, { useEffect } from 'react'
import userConversation from '../src/zustand/userConversation';
import { UserConversation } from '../src/types';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = React.useState(false);
  const {messages, setMessages, selectedConversation} = userConversation() as UserConversation;
 
  useEffect(() => {
    const getMessages = async() => {
      console.log("Selected Conversation",selectedConversation);
      setLoading(true);
      try {
          const response = await fetch(`/api/messages/${selectedConversation._id}`);
          const data = await response.json();
          console.log("Result after getting messages", data);
          if (data.error) throw new Error(data.error);
          setMessages(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessages]);

 
  return { loading, messages };
}

export default useGetMessages