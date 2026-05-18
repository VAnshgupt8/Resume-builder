import { useContext, useState } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/login', form);

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      navigate('/dashboard');
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
        <h1 className="text-3xl font-bold mb-6">Login</h1>

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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;