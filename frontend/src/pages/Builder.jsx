import { useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import API from '../api/axios';
import { downloadPDF } from '../utils/pdfExport';

const Builder = () => {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });

  const saveResume = async () => {
    try {
      await API.post('/resume', resumeData);

      alert('Resume Saved Successfully');
    } catch (error) {
      console.log(error);
      alert('Error Saving Resume');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
{/*       
      Top Navbar
      <div className="flex justify-between items-center px-8 py-5 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-purple-400">
          Resume Builder
        </h1>

        <div className="flex gap-4">
          <button
            onClick={saveResume}
            className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg transition-all"
          >
            Save Resume
          </button>

          <button
            onClick={downloadPDF}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition-all"
          >
            Download PDF
          </button>
        </div>
      </div> */}
      {/* Top Navbar */}
<div className="flex justify-between items-center px-8 py-5 border-b border-zinc-800">

  <div className="flex items-center gap-4">

    <a
      href="/dashboard"
      className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-lg transition-all"
    >
      ←
    </a>

    <h1 className="text-3xl font-bold text-purple-400">
      Resume Builder
    </h1>

  </div>

  <div className="flex gap-4">

    <button
      onClick={saveResume}
      className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg transition-all"
    >
      Save Resume
    </button>

    <button
      onClick={downloadPDF}
      className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition-all"
    >
      Download PDF
    </button>

  </div>
</div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        
        {/* Left Form Side */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-6">
            Enter Resume Details
          </h2>

          <ResumeForm
            data={resumeData}
            setData={setResumeData}
          />
        </div>

        {/* Right Preview Side */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 overflow-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Live Preview
          </h2>

          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default Builder;