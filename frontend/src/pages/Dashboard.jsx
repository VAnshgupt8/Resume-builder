import { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = () => {

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchResumes();
  }, []);

  const fetchResumes = async () => {

    try {

      const { data } = await API.get('/resume');

      console.log(data);

      setResumes(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Top */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          My Resumes
        </h1>

        <a
          href="/builder"
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg"
        >
          Create Resume
        </a>

      </div>

      {/* Empty State */}
      {resumes.length === 0 ? (

        <div className="bg-zinc-900 rounded-2xl p-10 text-center">

          <h2 className="text-2xl font-bold mb-3">
            No Resume Found
          </h2>

          <p className="text-zinc-400">
            Create and save your first resume.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {resumes.map((resume) => (
            <a
              href={`/resume/${resume._id}`}
              key={resume._id}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 block hover:border-purple-500 transition-all"
            >
              <h2 className="text-2xl font-bold">
                {resume.fullName}
              </h2>

              <p className="text-purple-400 mt-2">
                {resume.title}
              </p>

              <p className="text-zinc-400 mt-3">
                {resume.email}
              </p>
            </a>
          ))}

        </div>

      )}

    </div>
  );
};

export default Dashboard;
// import { useEffect, useState } from 'react';
// import API from '../api/axios';

// const Dashboard = () => {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchResumes();
//   }, []);

//   const fetchResumes = async () => {
//     try {
//       const { data } = await API.get('/resume');
//       setResumes(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <div className="flex justify-between items-center mb-8">
//   <h1 className="text-4xl font-bold">
//     My Resumes
//   </h1>

//   <a
//     href="/builder"
//     className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg"
//   >
//     Create Resume
//   </a>
// </div>

//       {resumes.length === 0 ? (
//         <div className="bg-zinc-900 p-10 rounded-2xl text-center">
//           <h2 className="text-2xl font-semibold mb-4">
//             No Resume Found
//           </h2>

//           <p className="text-zinc-400">
//             Create your first resume from Builder Page
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-3 gap-6">
//           {resumes.map((resume) => (
//             <div
//               key={resume._id}
//               className="bg-zinc-900 p-6 rounded-2xl"
//             >
//               <h2 className="text-2xl font-bold">
//                 {resume.fullName}
//               </h2>

//               <p className="text-zinc-400 mt-2">
//                 {resume.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;