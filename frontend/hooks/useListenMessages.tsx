import { useEffect } from "react";

import { useSocketContext } from "../src/context/SocketContext"; 
import userConversation from "../src/zustand/userConversation";
import notificationSound from "../src/assets/sounds/notification.mp3"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages }: any = userConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage: any) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => {
			socket?.off("newMessage");
			return undefined;
		};
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
