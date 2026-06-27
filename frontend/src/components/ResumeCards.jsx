import API
from "../services/api";

import { toast }
from "react-toastify";

const ResumeCard =
({
 resume,
 refresh
})=>{

 const deleteResume =
 async()=>{

  try{

   await API.delete(
    `/resume/${resume._id}`
   );

   toast.success(
    "Deleted"
   );

   refresh();

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "Delete Failed"
   );

  }

 };
 // eslint-disable-next-line no-unused-vars
 const downloadPDF =
()=>{

 window.open(

 `${API.defaults.baseURL}
 /resume/pdf/${resume._id}`,

 "_blank"

 );

};

 return(
  <>
    <div
className="
inline-block
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
font-medium">

 ATS:
 {resume.atsScore || 0}%

</div>

 <div
 className="
 bg-white
 p-5
 rounded-xl
 shadow">

  <h2
  className="
  text-xl
  font-bold">

   {resume.title}

  </h2>

  <p>

   Template:
   {resume.template}

  </p>

  <p>

   ATS:
   {resume.atsScore}

  </p>

  <div
  className="
  flex
  gap-3
  mt-4">

   <button
   onClick={
    deleteResume
   }
   className="
   bg-red-500
   text-white
   px-3
   py-1
   rounded">

    Delete

   </button>

  </div>

 </div>
 <button

onClick={
 downloadPDF
}

className="
bg-blue-600
text-white
px-3
py-1
rounded"

>

 PDF

</button>
  </>
 );

};

export default ResumeCard;