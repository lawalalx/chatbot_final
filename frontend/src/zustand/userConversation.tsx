import { create } from "zustand";

const userConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  messages: [],
  setMessage: ((messages: any) => set({ messages }))

}));

export default userConversation



// const userConversation = () => {
//   return (
//     <div>
  
//     </div>
//   )
// }

// export default userConversation