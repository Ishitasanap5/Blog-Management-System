import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // clear auth context
    navigate("/login");
  };

  return (
    <nav className="bg-[#534AB7] text-white flex justify-between items-center px-6 py-4">
      <div className="font-bold text-xl">
        <Link to="/">Blogify</Link>
      </div>
      <ul className="flex gap-4 items-center">
        <Link to="/" className="hover:text-[#EEEDFE]">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-[#EEEDFE]">Dashboard</Link>
            <Link to="/create" className="hover:text-[#7F77DD] bg-[#EEEDFE] text-[#534AB7] px-3 py-1 rounded">Create Post</Link>
            <button onClick={handleLogout} className="hover:text-[#EEEDFE]">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#EEEDFE]">Login</Link>
            <Link to="/register" className="hover:text-[#7F77DD] bg-[#EEEDFE] text-[#534AB7] px-3 py-1 rounded">Sign Up</Link>
          </>
        )}
      </ul>
    </nav>
  );
}