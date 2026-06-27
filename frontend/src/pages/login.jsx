import { useForm }
from "react-hook-form";

import { useNavigate }
from "react-router-dom";

import { toast }
from "react-toastify";

import API
from "../services/api";

import { useAuth }
from "../context/authContext";

const Login = () => {

 const navigate =
 useNavigate();

 const { login } =
 useAuth();

 const {
  register,
  handleSubmit,
  formState: {
   errors
  }
 } = useForm();

 const onSubmit =
 async(data)=>{

  try{

   const res =
   await API.post(
    "/auth/login",
    data
   );

   login(
    res.data.token,
    res.data.user
   );

   toast.success(
    "Login Successful"
   );

   navigate(
    "/dashboard"
   );

  }catch(error){

   toast.error(
    error.response?.data?.message ||
    "Login Failed"
   );

  }

 };

 return(

 <div className="
 min-h-screen
 flex
 items-center
 justify-center
 bg-slate-950">

  <form
   onSubmit={
    handleSubmit(
     onSubmit
    )
   }
   className="
   bg-white
   p-8
   rounded-xl
   shadow-lg
   w-full
   max-w-md"
  >

   <h2 className="
   text-3xl
   font-bold
   mb-6">

    Login

   </h2>

   <input
    type="email"
    placeholder="Email"
    {...register(
     "email",
     {
      required:true
     }
    )}
    className="
    w-full
    border
    p-3
    rounded
    mb-3"
   />

   {errors.email &&
    <p>Email Required</p>
   }

   <input
    type="password"
    placeholder="Password"
    {...register(
     "password",
     {
      required:true
     }
    )}
    className="
    w-full
    border
    p-3
    rounded
    mb-3"
   />

   <button
    className="
    w-full
    bg-indigo-600
    text-white
    py-3
    rounded"
   >

    Login

   </button>

  </form>

 </div>

 );

};

export default Login;