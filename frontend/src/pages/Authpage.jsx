import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const { data } = await API.post('/auth/login', {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);

        navigate('/dashboard');
      } else {
        await API.post('/auth/register', form);

        alert('Registration Successful');

        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">
            ResumePro
          </h1>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <p className="text-zinc-400 text-center mb-8">
          {isLogin
            ? 'Login to continue building resumes'
            : 'Create your professional account'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 mb-4 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-purple-500"
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 mb-4 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-purple-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-purple-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition-all duration-300 p-3 rounded-lg font-semibold"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-purple-400 hover:text-purple-300 font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;