import {
 useAuth
}
from "../context/authContext";
import ThemeToggle
from "./ThemeToggle";

const Navbar = () => {

 const { user } =
 useAuth();

 return (
    <>
    <ThemeToggle />

 <div
 className="
 h-16
 bg-white
 shadow
 flex
 items-center
 justify-between
 px-6">

  <h2
  className="
  text-xl
  font-bold">

   Dashboard

  </h2>

  <div>

   Welcome,
   {user?.name}

  </div>

 </div>
    </>
 );

};

export default Navbar;