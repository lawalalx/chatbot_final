import useSignUp  from "../../../hooks/useSignUp"

import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import Spinner from "../../components/spinners/Spinner";

const SignUp =  () => {

  const [ inputs, setInputs ] = useState({
    fullName: '' ,
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const { loading, signup } =  useSignUp();
  console.log(loading)

  const handleCheckBoxChange = (gender: string)=> {
    setInputs({...inputs, gender: gender});
  }

  const handleSubmit = async (e: any)=> {
    e.preventDefault()
    console.log(inputs)
    await signup(inputs)  
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

        <h1 className="text-3xl font-semibold text-center text-gray-300">Sign Up
        <span className="text-blue-500 lg:ml-4">Chatty App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="John Doe"
              value={inputs.fullName}
              onChange={(e)=> setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Username"
              value={inputs.username}
              onChange={(e)=> setInputs({...inputs, username: e.target.value})}
            />
          </div>

          <div className="mt-4">
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={(e)=> setInputs({...inputs, password: e.target.value})}
            /> 
          </div>

          <div className="mt-4">
            <label className="label p-2">
              <span className="text-base label-text text-white">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Enter your password"
              value={inputs.confirmPassword}
              onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
            /> 
          </div>

          <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectGender={inputs.gender}/>

          <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400">Already have an account?  Sign In</Link>

          <button className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {
              loading ? (
                <Spinner loading={loading} />
              ) : "sign Up"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;


// Starter Code

// import GenderCheckBox from "./GenderCheckBox";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

//         <h1 className="text-3xl font-semibold text-center text-gray-300">Sign Up
//         <span className="text-blue-500 lg:ml-4">Chatty App</span>
//         </h1>

//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text text-white">Full Name</span>
//             </label>
//             <input
//               type="text"
//               className="w-full input input-bordered h-10"
//               placeholder="John Doe"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text text-white">Full Name</span>
//             </label>
//             <input
//               type="text"
//               className="w-full input input-bordered h-10"
//               placeholder="John Doe"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="label p-2">
//               <span className="text-base label-text text-white">Password</span>
//             </label>
//             <input
//               type="password"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter your password"
//             /> 
//           </div>

//           <div className="mt-4">
//             <label className="label p-2">
//               <span className="text-base label-text text-white">Confirm Password</span>
//             </label>
//             <input
//               type="password"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter your password"
//             /> 
//           </div>

//           <GenderCheckBox />

//           <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400">Already have an account?  Sign In</a>

//           <button className="btn btn-primary w-full mt-4">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp;