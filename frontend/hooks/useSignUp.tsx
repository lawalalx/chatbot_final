import { useState } from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../src/context/AuthContext'
import { useSignUpParams } from '../src/types';


const useSignUp =  () => {

  const [ loading, setLoading ] = useState(false);
  const { setAuthuser } = useAuthContext()
   
  const signup = async({fullName, username, password, confirmPassword, gender}: useSignUpParams) => {

    
    const success = handleInputErrors({
      fullName, username, password, confirmPassword, gender
    });

    console.log(
      fullName, username, password, confirmPassword, gender
    )
    
    if  (!success) return;

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            fullName, 
            username, 
            password, 
            confirmPassword, 
            gender
          })
        }
      )
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error)
      }
       
      // Set Local Storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      console.log(typeof data)
      setAuthuser(data)
      
    } catch (error) {
      console.log(error)
      toast.error((error as Error).message)
    }finally{
      setLoading(false);
    }
  }
  return {
    loading,
    signup,
  }
}

export default useSignUp



// Handle credentials fomalities
const handleInputErrors = ({
  fullName, username, password, confirmPassword, gender
}: useSignUpParams)=> {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all fields")
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
  }

  return true;

}