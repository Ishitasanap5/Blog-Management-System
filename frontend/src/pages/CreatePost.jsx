import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CreatePost = () => {
    const [form, setForm] = useState({ title: '', content: '', category: 'Tech' });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let thumbnailUrl = '';
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const { data } = await API.post('/blogs/upload', formData);
                thumbnailUrl = data.url;
            }
            await API.post('/blogs/create', { ...form, thumbnail: thumbnailUrl });
            navigate('/');
        } catch (err) { alert("Error creating post"); }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" className="w-full p-3 border rounded-lg" onChange={e => setForm({...form, title: e.target.value})} required />
                <select className="w-full p-3 border rounded-lg" onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="Tech">Tech</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Coding">Coding</option>
                </select>
                <input type="file" className="w-full" onChange={e => setFile(e.target.files[0])} />
                <textarea placeholder="Content" className="w-full p-3 border rounded-lg h-40" onChange={e => setForm({...form, content: e.target.value})} required />
                <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold">Publish</button>
            </form>
        </div>
    );
};
export default CreatePost;