import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5"
import userConversation from "../../zustand/userConversation";
import useGetConversation from "../../../hooks/useGetConversation";
import toast from "react-hot-toast";


type UserConversationType = {
  setSelectedConversation: (conversation: any) => void;
};

type ConversationItem = {
  fullName: string;
};


const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = userConversation() as UserConversationType;
	const { conversation } = useGetConversation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversatn = conversation.find((c: ConversationItem) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversatn);
			setSearch("");
		} else toast.error("No such user found!");
	};


  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>

        <input type="text"
          className="input input-bordered rounded-full"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp size={20}/>
        </button>
    </form>
  )
}

export default SearchInput


// Starter Code
// import { IoSearchSharp } from "react-icons/io5"

// const SearchInput = () => {
//   return (
//     <form className="flex items-center gap-2">

//         <input type="text"
//           className="input input-bordered rounded-full"
//           placeholder="Search"
//         />

//         <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//           <IoSearchSharp />
//         </button>
//     </form>
//   )
// }

// export default SearchInput