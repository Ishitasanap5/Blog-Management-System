import Blog from '../models/Blog.js';

// CREATE: New Blog Post
export const createBlog = async (req, res) => {
    try {
        const { title, content, thumbnail, tags, category } = req.body;
        
        const newBlog = new Blog({
            title,
            content,
            thumbnail,
            tags,
            category,
            author: req.user.id // This comes from our auth middleware
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: "Failed to create post", error: error.message });
    }
};

// READ: Fetch All Posts
export const getAllBlogs = async (req, res) => {
    try {
        // .populate('author', 'name email') joins user data so we see the author's name
        const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};

// UPDATE: Edit Blog Post
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Post not found" });

        // Check if the user is the owner of the blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to edit this post" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// DELETE: Delete Blog Post
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Post not found" });

        // Check if user is the owner
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to delete this post" });
        }

        await blog.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};