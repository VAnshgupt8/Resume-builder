import {
 LayoutDashboard,
 FileText,
 PlusCircle,
 LogOut
}
from "lucide-react";

import {
 Link,
 useNavigate
}
from "react-router-dom";

import {
 useAuth
}
from "../context/authContext";

const Sidebar = () => {

 const navigate =
 useNavigate();

 const { logout } =
 useAuth();

 const handleLogout =
 ()=>{

  logout();

  navigate("/login");

 };

 return (

 <aside
 className="
 w-64
 min-h-screen
 bg-slate-900
 text-white
 p-5">

  <h1
  className="
  text-2xl
  font-bold
  mb-10">

   Resume Builder

  </h1>

  <nav
  className="
  flex
  flex-col
  gap-5">

   <Link
   to="/dashboard"
   className="flex gap-2">

    <LayoutDashboard />

    Dashboard

   </Link>

   <Link
   to="/resume/create"
   className="flex gap-2">

    <PlusCircle />

    Create Resume

   </Link>

   <Link
   to="/resumes"
   className="flex gap-2">

    <FileText />

    My Resumes

   </Link>

   <button
   onClick={
    handleLogout
   }
   className="
   flex
   gap-2
   mt-10">

    <LogOut />

    Logout

   </button>

  </nav>

 </aside>

 );

};

export default Sidebar;