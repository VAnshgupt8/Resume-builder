import {
 useEffect,
 useState
}
from "react";

import {
 useParams
}
from "react-router-dom";

import API
from "../services/api";

import ResumePreview
from "../components/ResumePreview";
import ATSScore
from "../components/ATSScore";

const ResumeDetails =
()=>{

 const { id } =
 useParams();

 const [resume,
 setResume] =
 useState(null);

 useEffect(()=>{

  // eslint-disable-next-line react-hooks/immutability
  loadResume();

 },[]);

 const loadResume =
 async()=>{

  const res =
  await API.get(
   `/resume/${id}`
  );

  setResume(
   res.data.data
  );

 };

 if(!resume){

  return <p>Loading...</p>;

 }

return(

<div className="
max-w-7xl
mx-auto
p-8">

 <ResumePreview
  resume={resume}
 />

 <ATSScore
  resumeId={id}
 />

</div>

);

};

export default ResumeDetails;