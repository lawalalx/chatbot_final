import { useState } from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../src/context/AuthContext'
import { useSignUpParams } from '../src/types'

const useLogIn =  () => {

  const [ loading, setLoading ] = useState(false);
  const { setAuthuser } = useAuthContext()
   
  const login = async( {username, password}: useSignUpParams) => {

    const success = handleInputErrors({ username, password });
    
    if  (!success) return;

    setLoading(true)
    try {
      const res = await fetch("/api/auth/login",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password})
        }
      )
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error)
      }
       
      // Set Local Storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthuser(data); 
      
    } catch ( error) {
      console.log(error)
      toast.error((error as Error).message)
    }finally{
      setLoading(false);
    }
  }
  return {
    loading,
    login,
  }
}

export default useLogIn




// Handle credentials fomalities
const handleInputErrors = ({ username, password
}: useSignUpParams)=> {
  if ( !username || !password ) {
    toast.error("Please fill all fields")
    return false;
  };

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
  };

  return true;

}