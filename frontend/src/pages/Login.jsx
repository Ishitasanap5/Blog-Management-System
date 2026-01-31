import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', form);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
                {error && <p className="text-red-500 bg-red-50 p-2 rounded text-sm mb-4">{error}</p>}
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4 outline-blue-500"
                    onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-6 outline-blue-500"
                    onChange={e => setForm({...form, password: e.target.value})} required />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Login</button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    New here? <Link to="/register" className="text-blue-600 font-bold">Create Account</Link>
                </p>
            </form>
        </div>
    );
};
export default Login;