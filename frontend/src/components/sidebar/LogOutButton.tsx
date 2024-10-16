import { BiLogOut } from "react-icons/bi"
import useLogOut from "../../../hooks/useLogOut"
import Spinner from "../spinners/Spinner"

const LogOutButton = () => {

  const { loading, logout } = useLogOut()
  return (
    <div className="mt-auto">
      {
        !loading ? 
        (<span className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        >
        <BiLogOut  size={20}
        />
        </span>) :
        <Spinner loading={loading} />
      }
      
    </div>
  )
}

export default LogOutButton