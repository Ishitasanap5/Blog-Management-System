import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, PenSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <PenSquare /> BlogHub
            </Link>
            <div className="flex gap-4 items-center">
                <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
                {user ? (
                    <>
                        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Write</Link>
                        <span className="text-gray-600 hidden sm:block">Hi, {user.name}</span>
                        <button onClick={() => { logout(); navigate('/login'); }} className="text-red-500"><LogOut /></button>
                    </>
                ) : (
                    <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded-lg">Login</Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;