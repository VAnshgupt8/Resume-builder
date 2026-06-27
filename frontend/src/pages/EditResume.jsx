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

import ResumeForm
from "../components/ResumeForm";

const EditResume = ()=>{

 const { id } =
 useParams();

 const [resume,
 setResume] =
 useState(null);

 useEffect(()=>{

  // eslint-disable-next-line react-hooks/immutability
  fetchResume();

 },[]);

 const fetchResume =
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

  <ResumeForm
   editData={resume}
  />

 );

};

export default EditResume;