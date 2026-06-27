const ProfessionalResume =
({ resume })=>{

 return(

 <div
 className="
 bg-white
 p-10
 max-w-5xl
 mx-auto">

  <div
  className="
  border-b
  pb-6">

   <h1
   className="
   text-4xl
   font-bold">

    {
     resume.personal
     ?.fullName
    }

   </h1>

   <p>

    {
     resume.personal
     ?.email
    }

   </p>

   <p>

    {
     resume.personal
     ?.phone
    }

   </p>

  </div>

  <section
  className="mt-6">

   <h2
   className="
   text-xl
   font-bold">

    Executive Summary

   </h2>

   <p>

    {resume.summary}

   </p>

  </section>

  <section
  className="mt-6">

   <h2
   className="
   text-xl
   font-bold">

    Experience

   </h2>

   {
    resume.experience
    ?.map(
    (exp,index)=>(

    <div
    key={index}
    className="
    mt-4">

     <h3
     className="
     font-semibold">

      {exp.role}

     </h3>

     <p>

      {exp.company}

     </p>

    </div>

   ))
   }

  </section>

  <section
  className="mt-6">

   <h2
   className="
   text-xl
   font-bold">

    Projects

   </h2>

   {
    resume.projects
    ?.map(
    (project,index)=>(

    <div
    key={index}
    className="
    mt-3">

     <h3
     className="
     font-semibold">

      {project.title}

     </h3>

     <p>

      {
       project.description
      }

     </p>

    </div>

   ))
   }

  </section>

 </div>

 );

};

export default ProfessionalResume;