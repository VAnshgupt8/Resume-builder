import {
 useForm
}
from
"react-hook-form";

import {
 useNavigate
}
from
"react-router-dom";

import {
 toast
}
from
"react-toastify";

import API
from
"../services/api";

import {
 useAuth
}
from
"../context/authContext";

const Register =
()=>{

 const navigate =
 useNavigate();

 const { login } =
 useAuth();

 const {

  register,
  handleSubmit,
  watch
 } = useForm();

 const onSubmit =
 async(data)=>{

  try{

   const res =
   await API.post(

    "/auth/register",

    {
     name:data.name,
     email:data.email,
     password:data.password
    }

   );

   login(
    res.data.token,
    res.data.user
   );

   toast.success(
    "Account Created"
   );

   navigate(
    "/dashboard"
   );

  }catch(error){

   toast.error(
    error.response?.data?.message
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

    Register

   </h2>

   <input
    placeholder="Name"
    {...register(
     "name",
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

   <input
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

   <input
    type="password"
    placeholder="Password"
    {...register(
     "password",
     {
      required:true,
      minLength:6
     }
    )}
    className="
    w-full
    border
    p-3
    rounded
    mb-3"
   />

   <input
    type="password"
    placeholder="Confirm Password"
    {...register(
     "confirmPassword",
     {
      validate:
      value =>
      value ===
      watch(
       "password"
      )
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

    Create Account

   </button>

  </form>

 </div>

 );

};

export default Register;