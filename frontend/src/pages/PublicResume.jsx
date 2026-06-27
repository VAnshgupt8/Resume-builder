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

const PublicResume =
()=>{

 const { id } =
 useParams();

 const [resume,
 setResume] =
 useState(null);

 useEffect(()=>{

  // eslint-disable-next-line react-hooks/immutability
  fetchResume();

 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);

 const fetchResume =
 async()=>{

  const res =
  await API.get(
   `/resume/public/${id}`
  );

  setResume(
   res.data.data
  );

 };

 if(!resume){

  return(
   <p>
    Loading...
   </p>
  );

 }

 return(

 <div
 className="
 p-8">

  <ResumePreview
   resume={resume}
  />

 </div>

 );

};

export default PublicResume;