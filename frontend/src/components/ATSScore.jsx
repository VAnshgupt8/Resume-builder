import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const ATSScore = ({ resumeId }) => {

 const [loading,setLoading] =
 useState(false);

 const [score,setScore] =
 useState(null);

 const [feedback,setFeedback] =
 useState([]);

 const checkATS =
 async()=>{

  try{

   setLoading(true);

   const res =
   await API.get(
    `/ats/${resumeId}`
   );

   setScore(
    res.data.score
   );

   setFeedback(
    res.data.feedback || []
   );

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "ATS Check Failed"
   );

  }

  setLoading(false);

 };

 return(

 <div className="
 bg-white
 p-6
 rounded-xl
 shadow
 mt-6">

  <button

   onClick={checkATS}

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
    "Checking..."
    :
    "Check ATS Score"
   }

  </button>

  {
   score !== null && (

   <div className="mt-5">

    <h3 className="
    text-xl
    font-bold">

     ATS Score:
     {score}%

    </h3>

    <div
    className="
    w-full
    bg-gray-200
    h-4
    rounded-full
    mt-3">

     <div

      className="
      bg-green-500
      h-4
      rounded-full"

      style={{
       width:
       `${score}%`
      }}

     />

    </div>

    <ul
    className="
    mt-4
    list-disc
    pl-5">

     {
      feedback.map(
      (item,index)=>(
       <li key={index}>
        {item}
       </li>
      ))
     }

    </ul>

   </div>

   )
  }

 </div>

 );

};

export default ATSScore;