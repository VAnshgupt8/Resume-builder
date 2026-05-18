const ResumePreview = ({ data }) => {
  return (
    <div
      id="resume-preview"
      className="bg-white text-black p-10 rounded-2xl min-h-screen shadow-2xl"
    >

      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-5xl font-bold">
          {data.fullName || 'Your Name'}
        </h1>

        <p className="text-2xl text-gray-600 mt-2">
          {data.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap gap-4 mt-4 text-gray-700">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b pb-2 mb-3">
          Professional Summary
        </h2>

        <p className="leading-7 text-gray-800">
          {data.summary || 'Write your professional summary here...'}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Experience
        </h2>

        {data.experience?.length > 0 ? (
          data.experience.map((exp, index) => (
            <div key={index} className="mb-6">

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {exp.role || 'Job Role'}
                </h3>

                <p className="text-gray-600">
                  {exp.duration}
                </p>
              </div>

              <p className="font-medium text-purple-600 mt-1">
                {exp.company}
              </p>

              <p className="mt-2 text-gray-700 leading-6">
                {exp.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No experience added yet.
          </p>
        )}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Education
        </h2>

        {data.education?.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index} className="mb-5">

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {edu.degree || 'Degree'}
                </h3>

                <p className="text-gray-600">
                  {edu.year}
                </p>
              </div>

              <p className="text-purple-600 font-medium mt-1">
                {edu.school}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No education added yet.
          </p>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Skills
        </h2>

        {data.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No skills added yet.
          </p>
        )}
      </div>

    </div>
  );
};

export default ResumePreview;
// const ResumePreview = ({ data }) => {
//   return (
//     <div id="resume-preview" className="bg-white text-black p-8 rounded-lg">
//       <h1 className="text-4xl font-bold">{data.fullName}</h1>
//       <p>{data.title}</p>
//       <p>{data.email}</p>

//       <hr className="my-4" />

//       <h2 className="text-xl font-bold">Experience</h2>

//       {data.experience.map((exp, index) => (
//         <div key={index} className="mb-4">
//           <h3 className="font-semibold">{exp.role}</h3>
//           <p>{exp.company}</p>
//           <p>{exp.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ResumePreview;