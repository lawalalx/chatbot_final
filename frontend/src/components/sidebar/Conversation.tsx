import { PiSmileyBold } from "react-icons/pi";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img 
              src="/male-icon.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">John Doe</p>
            <span className="text-xl">
              <PiSmileyBold size={30}/>
            </span>
          </div>
        </div>
      </div>

      <div></div>
    </>
  )
}

export default Conversation