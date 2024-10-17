export interface useSignUpParams {
  fullName?: string
  username?: string
  password?: string
  confirmPassword?: string
  gender?: string
}


export interface ConversationProps {
  conversation: any;
  lastIdx: boolean ;
  emoji: any;
}

 // Define the expected return type of userConversation
 export interface UserConversation {
  selectedConversation: { 
    _id: string, 
    fullName?: string;
    profilePic?: string;
  }
  setSelectedConversation: (conversation: any) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
}