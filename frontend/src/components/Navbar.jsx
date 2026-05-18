import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-2xl font-bold">ResumePro</h1>

      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/builder">Builder</Link>
      </div>
    </div>
  );
};

export default Navbar;