import useGetConversation from "../../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/Emojis";
import Spinner from "../spinners/Spinner";
import Conversation from "./Conversation";

// Define a type for the conversation object
type ConversationType = {
  _id: string;
  name: string;
  messages: Array<any>;
  lastMessage: string;
};

const Conversations = () => {
  const { loading, conversation } = useGetConversation();

  console.log(conversation);

  return (
    <div className="py-2 flex flex-col overflow-auto">
       {
        conversation.map((conversation: ConversationType, idx, arr) => (
          <Conversation 
            key={conversation._id} 
            conversation={conversation} 
            emoji={getRandomEmoji()}
            lastIdx={idx === arr.length - 1}
          />
        ))
      }
      
      {
        loading? (
          <Spinner loading={loading} height={40} width={40} />
        ) :
        null
      }
    </div>
  )
}

export default Conversations;