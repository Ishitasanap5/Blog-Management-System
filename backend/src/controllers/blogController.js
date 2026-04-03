import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;
        const newBlog = await Blog.create({ title, content, tags, category, author: req.user.id });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.author.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.author.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

        await blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};