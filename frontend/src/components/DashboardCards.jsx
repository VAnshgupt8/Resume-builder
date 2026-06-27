const DashboardCards =
({ stats }) => {

 return (

 <div
 className="
 grid
 md:grid-cols-3
 gap-6">

  <div
  className="
  bg-white
  rounded-xl
  p-6
  shadow">

   <h3>
   Total Resumes
   </h3>

   <p
   className="
   text-4xl
   font-bold">

    {stats.totalResumes}

   </p>

  </div>

  <div
  className="
  bg-white
  rounded-xl
  p-6
  shadow">

   <h3>
   Public Resumes
   </h3>

   <p
   className="
   text-4xl
   font-bold">

    {stats.publicResumes}

   </p>

  </div>

  <div
  className="
  bg-white
  rounded-xl
  p-6
  shadow">

   <h3>
   Average ATS
   </h3>

   <p
   className="
   text-4xl
   font-bold">

    {
     Math.round(
      stats.averageATS
     )
    }%

   </p>

  </div>

 </div>

 );

};

export default DashboardCards;