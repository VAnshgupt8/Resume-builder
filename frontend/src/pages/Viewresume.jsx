/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import ResumePreview from '../components/ResumePreview';

const ViewResume = () => {

  const { id } = useParams();

  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {

    try {

      const { data } = await API.get('/resume');

      const selectedResume = data.find(
        (item) => item._id === id
      );

      setResume(selectedResume);

    } catch (error) {
      console.log(error);
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Resume...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-10">

      <div className="mb-6">
        <a
          href="/dashboard"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          ← Back Dashboard
        </a>
      </div>

      <ResumePreview data={resume} />

    </div>
  );
};

export default ViewResume;