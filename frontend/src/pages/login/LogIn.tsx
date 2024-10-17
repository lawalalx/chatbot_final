import {  FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import useLogIn from "../../../hooks/useLogIn"
import Spinner from "../../components/spinners/Spinner"


const Login = () => {

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })

  
  const {loading, login} = useLogIn()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    console.log(userData)
    await login(userData)
  }

   
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

        <h1 className="text-3xl font-semibold text-center text-gray-300">Login
        <span className="text-blue-500 lg:ml-4">Chatty App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter your username"
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              value={userData.username}
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
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              value={userData.password}
            />
          </div>

          <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400">{"Don't"} have an account? Register</Link>
          <button className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {
              loading ? (
                <Spinner loading={loading} height={20} width={20}/>
              ) : "Log In"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login






// Starter Code
// const Login = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

//         <h1 className="text-3xl font-semibold text-center text-gray-300">Login
//         <span className="text-blue-500 lg:ml-4">Chatty App</span>
//         </h1>

//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text text-white">Username</span>
//             </label>
//             <input
//               type="text"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter your username"
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

//           <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400">{"Don't"} have an account? Register</Link>

//           <button className="btn btn-primary w-full mt-4">Login</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login