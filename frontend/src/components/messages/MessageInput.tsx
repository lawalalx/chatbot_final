import { BsSend } from "react-icons/bs"
import useSendMessages from "../../../hooks/useSendMessages"
import { useState } from "react";
import Spinner from "../spinners/Spinner";

const MessageInput = () => {

  const [message, setMessage] = useState("")
  const {loading, sendMessage} = useSendMessages();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Message sent")
    if (message.trim() === "") return;
    await sendMessage(message)
    setMessage("");
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input 
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
        />

        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {
            loading? <Spinner width={20} height={20}  loading={loading} /> : <BsSend />   
          }
        </button>
      </div>
    </form>
  )
}

export default MessageInput