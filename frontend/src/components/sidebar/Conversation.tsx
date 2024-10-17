import userConversation from "../../zustand/userConversation";
import { ConversationProps } from "../../types";
import { UserConversation } from "../../types";
import { useSocketContext } from "../../context/SocketContext";


const Conversation = ({conversation, lastIdx, emoji}: ConversationProps) => {

// Use the interface to type the destructured properties
const { selectedConversation, setSelectedConversation } = userConversation() as UserConversation;
const { onlineUsers } = useSocketContext();
// Check if the user is online or not
const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
        ${isSelected? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}  
        >
        <div className={`avatar ${isOnline? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img 
              src={conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">
              {emoji}
            </span>
          </div>
        </div>
      </div>

      {
        !lastIdx && (
          <div className="divider my-0 py-0 h-5"></div> 
        )
      }
    </>
  )
}

export default Conversation;