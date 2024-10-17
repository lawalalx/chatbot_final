import { useState, useEffect } from'react'
import toast from 'react-hot-toast';


const useGetConversation = () => {
  const [loading, setLoading] = useState(true)
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await fetch('api/users');
        const data = await response.json();
        
        if (data.error){
          throw new Error(data.error); 
        };
        setConversation(data);
      } catch (error) {
        toast.error((error as Error).message);
      }finally {
        setLoading(false);
      }
    }
    getConversation();
  }, []);



  return { loading, conversation };
}

export default useGetConversation