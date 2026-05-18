import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-black border"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-black border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-purple-500 p-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;