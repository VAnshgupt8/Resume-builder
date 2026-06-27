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

const AISummaryGenerator =
({
 setValue,
 summary
})=>{

 const [role,
 setRole] =
 useState("");

 const [skills,
 setSkills] =
 useState("");

 const [experience,
 setExperience] =
 useState("");

 const [loading,
 setLoading] =
 useState(false);

 const generateSummary =
 async()=>{

  try{

   setLoading(true);

   const res =
   await API.post(

    "/ai/summary",

    {
     role,
     skills,
     experience
    }

   );

   setValue(

    "summary",

    res.data.summary

   );

   toast.success(
    "Summary Generated"
   );

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "Generation Failed"
   );

  }

  setLoading(false);

 };

 const improveSummary =
 async()=>{

  try{

   const res =
   await API.post(

    "/ai/improve",

    {
     summary
    }

   );

   setValue(

    "summary",

    res.data
    .improvedSummary

   );

   toast.success(
    "Summary Improved"
   );

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "Improve Failed"
   );

  }

 };

 return(

 <div
 className="
 bg-white
 p-6
 rounded-xl
 shadow
 mb-6">

  <h2
  className="
  text-xl
  font-bold
  mb-4">

   AI Summary Assistant

  </h2>

  <input

   placeholder="Role"

   value={role}

   onChange={(e)=>
   setRole(
    e.target.value
   )}

   className="
   border
   p-3
   rounded
   w-full
   mb-3"

  />

  <input

   placeholder="Skills"

   value={skills}

   onChange={(e)=>
   setSkills(
    e.target.value
   )}

   className="
   border
   p-3
   rounded
   w-full
   mb-3"

  />

  <textarea

   placeholder=
   "Experience"

   value={experience}

   onChange={(e)=>
   setExperience(
    e.target.value
   )}

   className="
   border
   p-3
   rounded
   w-full
   mb-3"

  />

  <div
  className="
  flex
  gap-3">

   <button

   onClick={
    generateSummary
   }

   className="
   bg-indigo-600
   text-white
   px-5
   py-2
   rounded"

   >

    {
     loading
     ?
     "Generating..."
     :
     "Generate"
    }

   </button>

   <button

   onClick={
    improveSummary
   }

   className="
   bg-green-600
   text-white
   px-5
   py-2
   rounded"

   >

    Improve

   </button>

  </div>

 </div>

 );

};

export default
AISummaryGenerator;