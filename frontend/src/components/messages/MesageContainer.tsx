import { TiMessages } from "react-icons/ti"
import MessageInput from "./MessageInput"
import Messages from "./Messages";
import { UserConversation } from "../../types";
import userConversation from "../../zustand/userConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";





const MesageContainer = () => {
  // Use the interface to type the destructured properties
const { selectedConversation, setSelectedConversation } = userConversation() as UserConversation;


useEffect(()=> {
  return () => setSelectedConversation(null)
}, [setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      { 
      !selectedConversation ? (
      <NoChatSelected />
      ) : 
      (
        <>
        {/*    Header  */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To: </span> {" "}
          <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
        </div>
        <Messages />
        <MessageInput />
        </>
      )}
    </div>
  )
  

  
}

export default MesageContainer



const NoChatSelected = () =>{
  const {authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName}</p>
        <p>Select a chat to start messages</p>
        <span className="text-center">
          <TiMessages size={20}  />
        </span>
      </div>

    </div>
  )
}