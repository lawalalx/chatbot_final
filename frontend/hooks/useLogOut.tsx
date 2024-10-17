import { useState } from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../src/context/AuthContext'
// import { useSignUpParams } from '../src/types'

const useLogOut =  () => {

  const [ loading, setLoading ] = useState(false);
  const { setAuthuser } = useAuthContext()
   
  const logout = async() => {

    // const success = handleInputErrors({ username, password }); 

    // console.log(username, password)
    
    // if  (!success) return;

    setLoading(true)
    try {
      const res = await fetch("/api/auth/logout",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
        }
      )
      const data = await res.json();
      console.log(data)

      if (data.error) {
        throw new Error(data.error)
      }
       
      // Set Local Storage
      localStorage.removeItem("chat-user");
      setAuthuser(null); 
      
    } catch ( error) {
      console.log(error)
      toast.error((error as Error).message)
    }finally{
      setLoading(false);
    }
  }
  return {
    loading,
    logout,
  }
}

export default useLogOut




// // Handle credentials fomalities
// const handleInputErrors = ({
//   fullName, username, password, confirmPassword, gender
// }: useSignUpParams)=> {
//   if (!fullName || !username || !password || !confirmPassword || !gender) {
//     toast.error("Please fill all fields")
//     return false;
//   }

//   if (password !== confirmPassword) {
//     toast.error("Password do not match");
//     return false;
//   }

//   if (password.length < 6) {
//     toast.error("Password must be at least 6 characters")
//   }

//   return true;

// }