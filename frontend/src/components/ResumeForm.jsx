// eslint-disable-next-line no-unused-vars
import { useState } from 'react';

const ResumeForm = ({ data, setData }) => {

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (e) => {
    setData({
      ...data,
      skills: e.target.value.split(','),
    });
  };

  const handleExperienceChange = (index, e) => {
    const values = [...data.experience];

    values[index][e.target.name] = e.target.value;

    setData({
      ...data,
      experience: values,
    });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        {
          company: '',
          role: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const handleEducationChange = (index, e) => {
    const values = [...data.education];

    values[index][e.target.name] = e.target.value;

    setData({
      ...data,
      education: values,
    });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        {
          school: '',
          degree: '',
          year: '',
        },
      ],
    });
  };

  return (
    <div className="space-y-8">

      {/* Personal Information */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={data.fullName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={data.title}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={data.location}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />

          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={data.summary}
            onChange={handleChange}
            rows="4"
            className="p-3 rounded-lg bg-black border border-zinc-700"
          />
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Experience
          </h2>

          <button
            onClick={addExperience}
            className="bg-purple-500 px-4 py-2 rounded-lg"
          >
            Add Experience
          </button>
        </div>

        {data.experience.map((exp, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-4 rounded-xl mb-4 space-y-3"
          >
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />

            <textarea
              name="description"
              placeholder="Work Description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Education
          </h2>

          <button
            onClick={addEducation}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            Add Education
          </button>
        </div>

        {data.education.map((edu, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-4 rounded-xl mb-4 space-y-3"
          >
            <input
              type="text"
              name="school"
              placeholder="School / College"
              value={edu.school}
              onChange={(e) => handleEducationChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />

            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />

            <input
              type="text"
              name="year"
              placeholder="Passing Year"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, e)}
              className="w-full p-3 rounded bg-black border border-zinc-700"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Skills
        </h2>

        <input
          type="text"
          placeholder="Enter skills separated by comma"
          onChange={handleSkillChange}
          className="w-full p-3 rounded-lg bg-black border border-zinc-700"
        />
      </div>

    </div>
  );
};

export default ResumeForm;
// const ResumeForm = ({ data, setData }) => {
//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={data.fullName}
//         onChange={handleChange}
//         className="p-3 rounded bg-zinc-900 border"
//       />

//       <input
//         type="text"
//         name="title"
//         placeholder="Job Title"
//         value={data.title}
//         onChange={handleChange}
//         className="p-3 rounded bg-zinc-900 border"
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={data.email}
//         onChange={handleChange}
//         className="p-3 rounded bg-zinc-900 border"
//       />

//     </div>
//   );
// };

// export default ResumeForm;