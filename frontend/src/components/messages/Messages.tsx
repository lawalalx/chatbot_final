import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import Skeleton from "../Skeleton";
import Message from "./Message"
import useListenMessages from "../../../hooks/useListenMessages";


const  Messages = () => {
  // Get messages from the server
  const {messages, loading} = useGetMessages();
  console.log("Messages from Messages.tsx", messages);

	useListenMessages();
	const lastMessageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">

      {
        !loading && messages.length > 0 && messages.map((message: any) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
        ))
      }

      {
        loading && ( <Skeleton /> ) 
      }

      {
        !loading && messages.length === 0  && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-black/50 text-lg">Send a mesage to start a conversation</p>
          </div>
        ) 
      }
    </div>
  )
}

export default Messages;










// import Message from "./Message"

// const Messages = () => {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       <Message />
//       <Message />
//       <Message />
//     </div>
//   )
// }

// export default Messages