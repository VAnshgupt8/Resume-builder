const ATSResume = ({ resume }) => {

 return (

 <div className="bg-white p-8 max-w-4xl mx-auto">

  <h1 className="text-3xl font-bold">
   {resume.personal?.fullName}
  </h1>

  <p>
   {resume.personal?.email}
  </p>

  <p>
   {resume.personal?.phone}
  </p>

  <hr className="my-4"/>

  <h2 className="font-bold text-xl">
   Professional Summary
  </h2>

  <p>{resume.summary}</p>

  <h2 className="font-bold text-xl mt-5">
   Skills
  </h2>

  <ul className="list-disc pl-5">

   {resume.skills?.map((skill,index)=>(
    <li key={index}>
     {skill.name}
    </li>
   ))}

  </ul>

  <h2 className="font-bold text-xl mt-5">
   Experience
  </h2>

  {resume.experience?.map((exp,index)=>(

   <div key={index}>

    <h3 className="font-semibold">
     {exp.role}
    </h3>

    <p>{exp.company}</p>

   </div>

  ))}

 </div>

 );

};

export default ATSResume;