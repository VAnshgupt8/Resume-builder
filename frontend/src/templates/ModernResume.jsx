const ModernResume = ({ resume }) => {

 return (

 <div className="flex bg-white min-h-screen">

  <div className="w-1/3 bg-indigo-600 text-white p-6">

   <h1 className="text-3xl font-bold">

    {resume.personal?.fullName}

   </h1>

   <div className="mt-8">

    <h2 className="font-bold mb-3">

     Contact

    </h2>

    <p>{resume.personal?.email}</p>

    <p>{resume.personal?.phone}</p>

   </div>

   <div className="mt-8">

    <h2 className="font-bold mb-3">

     Skills

    </h2>

    <div className="flex flex-wrap gap-2">

     {resume.skills?.map(
      (skill,index)=>(

      <span
       key={index}
       className="
       bg-white
       text-indigo-600
       px-2
       py-1
       rounded-full">

       {skill.name}

      </span>

     ))}

    </div>

   </div>

  </div>

  <div className="flex-1 p-8">

   <h2 className="text-2xl font-bold">

    Summary

   </h2>

   <p className="mt-3">

    {resume.summary}

   </p>

   <h2 className="text-2xl font-bold mt-8">

    Experience

   </h2>

   {resume.experience?.map(
   (exp,index)=>(

    <div
     key={index}
     className="mt-4">

     <h3 className="font-semibold">

      {exp.role}

     </h3>

     <p>{exp.company}</p>

    </div>

   ))}

  </div>

 </div>

 );

};

export default ModernResume;