import { useEffect, useState } from 'react';
import API from '../api/axios';
import BlogCard from '../components/BlogCard';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const { data } = await API.get('/blogs/all');
            setBlogs(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this post?")) {
            await API.delete(`/blogs/delete/${id}`);
            fetchBlogs();
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-black mb-10 text-gray-900">Latest Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};
export default Dashboard;