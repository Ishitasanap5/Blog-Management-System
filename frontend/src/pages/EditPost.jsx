import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Include thumbnail in form state
  const [form, setForm] = useState({ title: '', content: '', category: '', thumbnail: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get('/blogs/all');
        const blogToEdit = data.find(b => b._id === id);

        if (blogToEdit) {
          setForm({
            title: blogToEdit.title,
            content: blogToEdit.content,
            category: blogToEdit.category,
            thumbnail: blogToEdit.thumbnail || ''
          });
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Handle form update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedThumbnail = form.thumbnail;

      // If user uploads a new file, send it to Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await API.post('/blogs/upload', formData);
        updatedThumbnail = data.url; // Cloudinary URL
      }

      // Update the blog
      await API.put(`/blogs/update/${id}`, { ...form, thumbnail: updatedThumbnail });
      navigate('/');
    } catch (err) {
      alert("Failed to update post");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading Post...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

      {/* Show current thumbnail if exists */}
      {form.thumbnail && (
        <img
          src={form.thumbnail}
          alt="Current thumbnail"
          className="h-48 w-full object-cover mb-4 rounded"
        />
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">Category</label>
          <select
            value={form.category}
            className="p-3 border rounded-lg"
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Coding">Coding</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">Content</label>
          <textarea
            value={form.content}
            className="p-3 border rounded-lg h-48 outline-blue-500"
            onChange={e => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">Change Thumbnail (optional)</label>
          <input
            type="file"
            className="w-full"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>

        <button className="bg-green-600 text-white w-full py-3 rounded-lg font-bold hover:bg-green-700 transition">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
