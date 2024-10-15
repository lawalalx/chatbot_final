import { IoSearchSharp } from "react-icons/io5"

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">

        <input type="text"
          className="input input-bordered rounded-full"
          placeholder="Search"
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