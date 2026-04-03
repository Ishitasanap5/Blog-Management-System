import { useState, useContext } from "react";
import axios from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/blogs/create", { ...form, tags: form.tags.split(",").map(t => t.trim()) }, { headers: { Authorization: `Bearer ${user.token}` } });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F1EFE8]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#534AB7] mb-6">Create Post</h2>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full mb-4 p-2 border rounded"/>
        <textarea name="content" placeholder="Content" onChange={handleChange} className="w-full mb-4 p-2 border rounded h-40"/>
        <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} className="w-full mb-4 p-2 border rounded"/>
        <button className="w-full bg-[#7F77DD] text-white p-2 rounded hover:bg-[#534AB7]">Publish</button>
      </form>
    </div>
  );
}