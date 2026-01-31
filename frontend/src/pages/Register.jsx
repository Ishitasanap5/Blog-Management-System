import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                {error && <p className="text-red-500 bg-red-50 p-2 rounded text-sm mb-4">{error}</p>}
                <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg mb-4 outline-blue-500"
                    onChange={e => setForm({...form, name: e.target.value})} required />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4 outline-blue-500"
                    onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-6 outline-blue-500"
                    onChange={e => setForm({...form, password: e.target.value})} required />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Register</button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
                </p>
            </form>
        </div>
    );
};
export default Register;