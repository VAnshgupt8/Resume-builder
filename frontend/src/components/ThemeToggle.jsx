import {
 Moon,
 Sun
}
from "lucide-react";

import useTheme
from "../hooks/useTheme";

const ThemeToggle = () => {

 const {
  darkMode,
  setDarkMode
 } = useTheme();

 return(

 <button

 onClick={()=>
 setDarkMode(
 !darkMode
 )}

 className="
 p-2
 rounded-lg
 bg-slate-200
 dark:bg-slate-700"

 >

  {
   darkMode
   ?
   <Sun />
   :
   <Moon />
  }

 </button>

 );

};

export default ThemeToggle;