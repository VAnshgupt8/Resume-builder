import {
 useState
}
from "react";

import API
from "../services/api";

import {
 toast
}
from "react-toastify";

const ShareModal =
({
 resumeId,
 close
})=>{

 const [link,
 setLink] =
 useState("");

 const generateLink =
 async()=>{

  try{

   await API.put(
    `/resume/share/${resumeId}`
   );

   const url =
   `${window.location.origin}
   /resume/public/${resumeId}`;

   setLink(url);

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "Share Failed"
   );

  }

 };

 const copyLink =
 async()=>{

  await navigator
  .clipboard
  .writeText(link);

  toast.success(
   "Copied"
  );

 };

 return(

 <div
 className="
 fixed
 inset-0
 bg-black/50
 flex
 items-center
 justify-center">

  <div
  className="
  bg-white
  p-6
  rounded-xl
  w-96">

   <h2
   className="
   text-xl
   font-bold
   mb-4">

    Share Resume

   </h2>

   <button

   onClick={
    generateLink
   }

   className="
   bg-indigo-600
   text-white
   px-4
   py-2
   rounded"

   >

    Generate Link

   </button>

   {
    link && (

    <>

     <input

      value={link}

      readOnly

      className="
      border
      p-2
      mt-4
      w-full"

     />

     <button

      onClick={
       copyLink
      }

      className="
      bg-green-600
      text-white
      px-4
      py-2
      mt-3
      rounded"

     >

      Copy

     </button>

    </>

    )
   }

   <button

   onClick={close}

   className="
   ml-3"

   >

    Close

   </button>

  </div>

 </div>

 );

};

export default ShareModal;