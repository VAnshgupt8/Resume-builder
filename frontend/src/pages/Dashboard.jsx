import {
 useEffect,
 useState
}
from "react";

import API
from "../services/api";

import Sidebar
from "../components/Sidebar";

import Navbar
from "../components/Navbar";

import DashboardCards
from "../components/DashboardCards";

import ResumeCard
from "../components/ResumeCards";

import SearchBar
from "../components/SearchBar";

import Loader
from "../components/Loader";

const Dashboard = () => {

 const [stats,
 setStats] =
 useState({});

 const [resumes,
 setResumes] =
 useState([]);

 const [loading,
 setLoading] =
 useState(true);

 const [search,
 setSearch] =
 useState("");

 const fetchData =
 async()=>{

  try{

   const statsRes =
   await API.get(
    "/resume/stats"
   );

   const resumeRes =
   await API.get(
    "/resume"
   );

   setStats(
    statsRes.data
   );

   setResumes(
    resumeRes.data.data
   );

  }catch(error){

   console.log(error);

  }

  setLoading(false);

 };

 useEffect(()=>{

  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchData();

 },[]);

 const filtered =
 resumes.filter(
  resume =>
  resume.title
  .toLowerCase()
  .includes(
   search
   .toLowerCase()
  )
 );

 if(loading){

  return <Loader />;

 }

 return (

 <div
 className="
 flex
 bg-slate-100">

  <Sidebar />

  <div
  className="
  flex-1">

   <Navbar />

   <div
   className="
   p-8">

    <DashboardCards
    stats={stats}
    />

    <div
    className="
    mt-8">

     <SearchBar

      search={search}

      setSearch={
       setSearch
      }

     />

    </div>

    <div
    className="
    grid
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
    mt-8">

     {
      filtered.map(
       resume=>(
       <ResumeCard

        key={
         resume._id
        }

        resume={
         resume
        }

        refresh={
         fetchData
        }

       />
      ))
     }

    </div>

   </div>

  </div>

 </div>

 );

};

export default Dashboard;